---
title: LEETCODE.剑指 Offer 53 - I. 在排序数组中查找数字 I
author: Pillow
tags:
  - 二分查找
  - offer
categories:
  - 算法
abbrlink: 2332703782
date: 2023-01-29 16:31:00
---
# LEETCODE.剑指 Offer 53 - I. 在排序数组中查找数字 I

## 题目

统计一个数字在排序数组中出现的次数。

## 示例

~~~
输入: nums = [5,7,7,8,8,10], target = 8
输出: 2
~~~

~~~
输入: nums = [5,7,7,8,8,10], target = 6
输出: 0
~~~



## 题解

很简单，遍历一遍计数即可

~~~Java
public int search(int[] nums, int target) {
    int count = 0;
    for (int num : nums) if(num == target) count++;
    return count;
}
~~~

既然是剑指Offer，面试官想考察的大概率是二分了

### 基本的二分搜索

~~~Java
int binarySear(int[] nums, int target) {
    int left = 0;
    int right = nums.length - 1;
    while(left <= right) {
        int mid = left + (right - left) / 2;
        if(nums[mid] == target)
            return mid;
        else if (nums[mid] < target)
            left = mid + 1;
        else if (nums[mid] > target)
            right = mid - 1;
    }
    return -1;
}
~~~

~~~
nums=[1,2,3,4,5,6,7,8,9],target = 8
5<8,target in [6,7,8,9]
7<8,target in [8,9]
8=8,find target
~~~

但是我们不是要在nums中找到target，而是统计target的数量，那么我们不去找target，而是根据target找到其左右边界下标，还是可以知道target数量。

#### 寻找左边界

~~~Java
public static int left_bounce(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return left;
}
~~~

#### 寻找右边界

~~~Java
public static int right_bounce(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] <= target) left = mid + 1;
            else right = mid - 1;
        }
        return right;
}
~~~

得出答案

~~~Java
public static int search(int[] nums, int target) {
    return right_bounce(nums, target) - left_bounce(nums, target) + 1;
}
~~~

## 拓展

二分查找，大白话就是不断将数组中间的数值与目标值比较，相等则查找成功，没有则根据升序降序以及中间的值比目标值的大小选择在中间值前半部分或后半部分作为子数组寻找，二分法主要有两种写法，一种是**左闭右闭**，一种是**左闭右开**。（左开右闭很少见）

两种方法的区别在代码中仅是两处的不同，哪个用着顺手用哪个。

二分查找精髓就是：根据已知信息尽多折叠搜索空间，减少搜索次数， 提高穷举效率，快速找到目标。

其时间复杂度一般为O(log n)

[二分查找可视化](https://www.cs.usfca.edu/~galles/visualization/Search.html)