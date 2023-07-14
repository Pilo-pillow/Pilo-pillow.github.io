---
title: LEETCODE.349.两个数组的交集
author: Pillow
tags:
  - 哈希表
categories:
  - 算法
abbrlink: 1848843960
date: 2023-01-29 16:33:00
---
# LEETCODE.349.两个数组的交集

## 题目

给定两个数组 `nums1` 和 `nums2` ，返回 *它们的交集* 。输出结果中的每个元素一定是 **唯一** 的。我们可以 **不考虑输出结果的顺序** 。

## 示例

~~~
输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2]
~~~

~~~
输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出：[9,4]
解释：[4,9] 也是可通过的
~~~



## 题解

索引效率高并且要去重，使用`HashSet`即可，其能够对加入元素自动去重

结果集也可以使用`HashSet`，最后要转换为数组

使用`HashSet`对其中一个数组纳入去重，然后遍历另一个数组，若在哈希表中出现过，则加入到结果集中，最后将结果集转换为数组返回即可

~~~Java
public static int[] intersection(int[] nums1, int[] nums2) {
        Set<Integer> set = new HashSet<>();
        Set<Integer> res = new HashSet<>();
        for (int num : nums1) set.add(num);
        for (int num : nums2) if (set.contains(num)) res.add(num);
        int[] resArr = new int[res.size()];
        int index = 0;
        for (int num : res) resArr[index++] = num;
        return resArr;
}
~~~

很基础的一道题