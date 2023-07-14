---
title: LEETCODE.4.寻找两个正序数组的中位数
author: Pillow
tags:
  - 二分
  - 困难
categories:
  - 算法
abbrlink: 1073433209
date: 2023-02-08 22:10:00
---
# LEETCODE.4.寻找两个正序数组的中位数

## 题目

给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。

算法的时间复杂度应该为 O(log (m+n)) 。

## 示例

~~~
输入：nums1 = [1,3], nums2 = [2]
输出：2.00000
解释：合并数组 = [1,2,3] ，中位数 2
~~~

~~~
输入：nums1 = [1,2], nums2 = [3,4]
输出：2.50000
解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
~~~



## 题解

梳理一下思路，先设定`nums1`、`nums2`的长度分别为`len1`、`len2`，总长`len`=`len1`+`len2`

若是`len%2==1`也就是`len`为奇数时，中位数的下标为`len/2`向下取整，

否则中位数为下标为`len/2`和`len/2-1`的两数的平均数。

题目的要求算法时间复杂度为`O(log(m+n))`，显而易见需要对两数组使用二分来查找中位数，先来想想各种思路。

### 直接寻找

知道了两数组总长度，那么无需将数组遍历完全就可以寻得中位数了，毕竟下标已经可以锁定了，中位数下标为K，那么找到两个数组合并后的第K小的数即可，这对两个有序数组很好处理。

~~~Java
public static double findMedianSortedArrays4(int[] nums1, int[] nums2) {
    int len1 = nums1.length;
    int len2 = nums2.length;
    int len = len1 + len2;
    int mid1 = -1, mid2 = -1;
    int index1 = 0, index2 = 0;
    for (int i = 0; i <= len / 2; i++) {
        mid2 = mid1;
// nums1[index1] < nums2[index2] && index1 < len1 || index1 < len1 && index2 >= len2
        if (index1 < len1 && (nums1[index1] < nums2[index2] || index2 >= len2)) {
            mid1 = nums1[index1++];
        }else {
            mid1 = nums2[index2++];
        }
    }
    return len % 2 == 0 ? (mid1 + mid2) / 2.0 : mid2;
}
~~~

关于`index1 < len1 && (nums1[index1] < nums2[index2] || index >= len2`

判断条件不能只是两数组的指针数值哪个小就给`mid1`赋值哪个，要考虑指针出界的情况

如果`len1 >> len2`，循环期间指针2`index2`已经到达`nums2`边界，此时执行`index2++`则下次条件判断时便会报错出界，所以在`index2 >= len2`的时候只移动指针1`index1`即可，同时保证`index1 < len1`防止越界。在`index2 < len2`的同时保证`nums1[index1] < nums2[index2]`即是另一使指针1移动的条件，`或`合并即是

`nums1[index1] < nums2[index2] && index1 < len1 || index1 < len1 && index2 >= len2`

可以转换为`index1 < len1 && (nums1[index1] < nums2[index2] || index2 >= len2`。

同样`len1 << len2`与上相同，不过是换了先后，另外长度相近的情况也可以通过。

### 二分Kth

第一种方法就是在寻找第`len/2`和`len/2-1`小的数，只不过使用循环索引的方式，既然题目要求了时间复杂度为log，那么用二分也可以在两数组中找到指定小的数。

之前提到过：

> 二分的精髓在于：根据已知信息 尽多折叠搜索空间，减少搜索次数，快速找到目标
>
> 二分的本质在于：两端性，即存在一个边界，使得在一边区间不满足搜寻条件，另一区间满足

那么问题就变成了在两个有序数组中使用二分找到第K小的数，每次循环排除掉`K/2`个数字即可。

首先，第K小的数只可能在某一个数组`[K/2,length-1]`区间内，无论是数组长度相差大与否都是如此，那么这个数组的`[0,K/2-1]`区间的元素共`K/2`个元素就可以去除了，此时我们要找的数就变为了第`K-(K/2)`小的数，在 此数组的`[K/2,length-1]`区间作为的新数组 与 另一数组再次进行比较`(K-(K/2))/2`元素然后舍弃，使得最后在两个截取不知多少次的数组中找到第1小的数返回即可。

为何能够保证

~~~
第K小的数只可能在某一个数组`[K/2,length-1]`区间内
~~~

因为`K/2`加上一个不大于`K/2`的数一定不大于K

开始时，我们比较两个数组中第`K/2`的数组，哪个小则表明该数组的前`K/2`个数组都不可能是第`K`小的数字，可以排除掉。然后将排除掉`K/2`后的数组，作为新数组与另一数组共同找第`K-(K/2)`小的数，也就是要比较各自第`(K-(K/2))/2`的元素，然后再次舍弃……

为了防止两数组长度差距大，导致判断各自第`K/2`小数字时越界，对`K/2`和`length`取小。

代码展示为：

~~~Java
/*
l1：上方数组的长度
l2：下方数组的长度
i：在目标在下方数组内时上方数组需要舍弃掉的元素数量
j：在目标在上方数组内时下方数组需要舍弃掉的元素数量
 */
private static int getKth(int[] nums1, int s1, int e1, int[] nums2, int s2, int e2, int k) {
    int l1 = e1 - s1 + 1;
    int l2 = e2 - s2 + 1;

    if (l1 > l2) return getKth(nums2, s2, e2, nums1, s1, e1, k);// 使短数组在上方
    if (l1 == 0) return nums2[s2 + k - 1];// 特殊情况判断
    if (k == 1) return Math.min(nums1[s1], nums2[s2]);// 正常情况递归的出口

    int i = s1 + Math.min(l1, k / 2) - 1;
    int j = s2 + Math.min(l2, k / 2) - 1;
    if (nums1[i] > nums2[j]) return getKth(nums1, s1, e1, nums2, j + 1, e2, k - (j - s2 + 1));
    else return getKth(nums1, i + 1, e1, nums2, s2, e2, k - (i - s1 + 1));
}
~~~

~~~Java
public static double findMedianSortedArrays5(int[] nums1, int[] nums2) {
    int len1 = nums1.length;
    int len2 = nums2.length;
    int mid1 = (len1 + len2 + 1) / 2;
    int mid2 = (len1 + len2 + 2) / 2;
    return (getKth(nums1, 0, len1 - 1, nums2, 0, len2 - 1, mid1) + getKth(nums1, 0, len1 - 1, nums2, 0, len2 - 1, mid2)) / 2.0;
}
~~~



最终的时间复杂度为`O(log(m+n))`

递归不停堆栈，空间复杂度为`O(1)`

### 二分切分

此方法时间复杂度为：`O(log min(m,n))`，还未参透，请等待更新

## 拓展

题目链接：[寻找两个正序数组的中位数](https://leetcode.cn/problems/median-of-two-sorted-arrays/)

