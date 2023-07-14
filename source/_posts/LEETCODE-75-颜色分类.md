---
title: LEETCODE.75.颜色分类
author: Pillow
tags:
  - 桶
  - 快排
categories:
  - 算法
abbrlink: 3641877063
date: 2023-02-18 17:38:00
---
# LEETCODE.75.颜色分类

## 题目

给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

必须在不使用库内置的 sort 函数的情况下解决这个问题。

## 示例

~~~
输入：nums = [2,0,2,1,1,0]
输出：[0,0,1,1,2,2]
~~~

~~~
输入：nums = [2,0,1]
输出：[0,1,2]
~~~



## 题解

### 叛逆解法

你说不用就不用？

~~~Java
class Solution {
    public void sortColors(int[] nums) {
        Arrays.sort(nums);
    }
}
~~~

![image-20230217193101955](LEETCODE.75.颜色分类.assets/image-20230217193101955.png)
你看看多快？？

### 单指针

简单分析，将数组分为三个区间，0区间，1区间，2区间。

一个指针遍历两边数组，第一遍将所有的0放在数组首部，第二遍将所有的1放在所有的0后，或者将所有的2放在数组尾部。

~~~Java
class Solution {
    public void sortColors(int[] nums) {
        int p = 0;
        for (int i = 0; i < nums.length; i++)
            if (nums[i] == 0) swap(nums, i, p++);

        for (int i = 0; i < nums.length; i++)
            if (nums[i] == 1) swap(nums, i, p++);
    }
    
    private void swap(int[] a, int x, int y) {
        int temp = a[x];
        a[x] = a[y];
        a[y] = temp;
    }
}
~~~

时间复杂度为`O(N^2)`

### 双指针

仍旧是三个区间

两个指针遍历一遍数组，将遍历到的1与指针`p1`位置元素交换，将遍历到的0与指针`p0`位置元素交换，然后遍历到的下标元素与`p1`元素交换

说明：`p0`指针指向1区间的首位，用于交换遍历到的0，`p1`指针指向2区间的首位，用于交换遍历到的1以及与`p0`指针交换的1

~~~Java
class Solution {
    public void sortColors(int[] nums) {
        int p0 = 0;
        int p1 = 0;
        for (int i = 0; i < nums.length; ++i) {
            if (nums[i] == 1) swap(nums, i, p1++);
            else if (nums[i] == 0) {
                swap(nums, i, p0);
                if (p0 != p1)
                    swap(nums, i, p1);
                p0++;
                p1++;
            }
        }
    }

    private void swap(int[] a, int x, int y) {
        int temp = a[x];
        a[x] = a[y];
        a[y] = temp;
    }
}
~~~

### 桶子

了解过桶排序吗？

创造三个桶，一个装0，一个装1，一个装2，我们能够从桶中知道0，1，2的数量，然后按照顺序和数量将0，1，2塞回原数组即可。

~~~Java
class Solution {
    public void sortColors(int[] nums) {
        int[] buc = new int[3];
        for (int num : nums)
            buc[num]++;
        int k = 0;
        for (int i = 0; i < 3; i++)
            for (int j = 0; j < buc[i]; j++)
                nums[k++] = i;
    }
}
~~~

### 三指针

三个指针遍历一遍数组

* `p0`在数组首部，指向0区间末尾的下一个元素，用于交换`p1`指到的0
* `p2`在数组尾部，指向2区间首位的下一个元素，用于交换`p1`指到的2
* `p1`遍历一遍数组，并作出处理

~~~Java
class Solution {
    public void sortColors(int[] nums) {
        int p0 = 0, p1 = 0, p2 = nums.length - 1;
        while (p1 <= p2) {
            if (nums[p1] == 0) swap(nums, p0++, p1++);
            else if (nums[p1] == 2) swap(nums, p2--, p1);
            else p1++;
        }
    }
    
    private void swap(int[] a, int x, int y) {
        int temp = a[x];
        a[x] = a[y];
        a[y] = temp;
    }
}
~~~

时间复杂度`O(N)`

## 拓展

[颜色分类](https://leetcode.cn/problems/sort-colors/)

实际上使用快排的双路和三路也可以，但是感觉不至于完全使用，效率高即可。�用，效率高即可。