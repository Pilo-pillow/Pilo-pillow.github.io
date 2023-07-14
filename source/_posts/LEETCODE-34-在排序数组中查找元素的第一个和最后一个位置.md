---
title: LEETCODE.34.在排序数组中查找元素的第一个和最后一个位置
author: Pillow
tags:
  - 二分查找
categories:
  - 算法
abbrlink: 2174551265
date: 2023-01-29 16:34:00
---
# LEETCODE.34.在排序数组中查找元素的第一个和最后一个位置

## 题目

给你一个按照非递减顺序排列的整数数组 `nums`，和一个目标值 `target`。请你找出给定目标值在数组中的开始位置和结束位置。

如果数组中不存在目标值 `target`，返回 `[-1, -1]`。

你必须设计并实现时间复杂度为 `O(log n)` 的算法解决此问题。

## 示例

~~~
输入：nums = [5,7,7,8,8,10], target = 8
输出：[3,4]
~~~

~~~
输入：nums = [5,7,7,8,8,10], target = 6
输出：[-1,-1]
~~~

~~~
输入：nums = [], target = 0
输出：[-1,-1]
~~~



## 题解

在非递减顺序排列的整数数组索引，应该想到使用**二分查找**

使用二分查找找到`target`的左右边界，即可求出`target`在数组中的首位末尾。

~~~Java
public static int[] searchRange(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        return new int[]{left_bounce(nums, target, left, right), right_bounce(nums, target, left, right)};
}

private static int left_bounce(int[] nums, int target, int left, int right) {
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] >= target) right = mid - 1;
        else left = mid + 1;
    }
    if (left >= nums.length || nums[left] != target) return -1;//补丁，避免查无此数
    return left;
}

private static int right_bounce(int[] nums, int target, int left, int right) {
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] <= target) left = mid + 1;
        else right = mid - 1;
    }
    if (right < 0 || nums[right] != target) return -1;//补丁，避免查无此数
    return right;
}
~~~

#### 复杂度分析

- 时间复杂度：*O*(log *n*)，其中 *n* 为数组的长度。二分查找的时间复杂度为*O*(log *n*)，一共会执行两次，因此总时间复杂度为*O*(log *n*)
- 空间复杂度：*O*(1)。只需要常数空间存放若干变量。

## 拓展

[剑指 Offer 53 - I. 在排序数组中查找数字 I](https://leetcode.cn/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof/description/)

博客中也有对应题解。