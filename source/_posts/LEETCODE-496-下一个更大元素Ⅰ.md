---
title: LEETCODE.496.下一个更大元素Ⅰ
author: Pillow
tags:
  - 栈
  - 单调栈
categories:
  - 算法
abbrlink: 4183362246
date: 2023-02-25 15:07:00
---
# LEETCODE.496.下一个更大元素Ⅰ

## 题目

nums1 中数字 x 的 下一个更大元素 是指 x 在 nums2 中对应位置 右侧 的 第一个 比 x 大的元素。

给你两个 没有重复元素 的数组 nums1 和 nums2 ，下标从 0 开始计数，其中nums1 是 nums2 的子集。

对于每个 0 <= i < nums1.length ，找出满足 nums1[i] == nums2[j] 的下标 j ，并且在 nums2 确定 nums2[j] 的 下一个更大元素 。如果不存在下一个更大元素，那么本次查询的答案是 -1 。

返回一个长度为 nums1.length 的数组 ans 作为答案，满足 ans[i] 是如上所述的 下一个更大元素 。

## 示例

### 示例1

~~~
输入：nums1 = [4,1,2], nums2 = [1,3,4,2].
输出：[-1,3,-1]
解释：nums1 中每个值的下一个更大元素如下所述：
- 4 ，用加粗斜体标识，nums2 = [1,3,4,2]。不存在下一个更大元素，所以答案是 -1 。
- 1 ，用加粗斜体标识，nums2 = [1,3,4,2]。下一个更大元素是 3 。
- 2 ，用加粗斜体标识，nums2 = [1,3,4,2]。不存在下一个更大元素，所以答案是 -1 。
~~~

### 示例2

~~~
输入：nums1 = [2,4], nums2 = [1,2,3,4].
输出：[3,-1]
解释：nums1 中每个值的下一个更大元素如下所述：
- 2 ，用加粗斜体标识，nums2 = [1,2,3,4]。下一个更大元素是 3 。
- 4 ，用加粗斜体标识，nums2 = [1,2,3,4]。不存在下一个更大元素，所以答案是 -1 。
~~~



## 题解

### 暴力循环

遍历`nums1`并在`nums2`找到与`num1`相等的数，之后再找比这个`num1`大的`num2`，能找到将其赋值给结果集，找不到则赋值-1。

~~~Java
class Solution {
    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
        int len1 = nums1.length, len2 = nums2.length;
        int[] res = new int[len1];
        for (int i = 0; i < len1; i++) {
            int j = 0;
            while (j < len2 && nums1[i] != nums2[j]) j++;
            while (j < len2 && nums1[i] >= nums2[j]) j++;
            res[i] = j < len2 ? nums2[j] : -1;
        }
        return res;
    }
}
~~~

### 单调栈

就是单调的栈，单调递增？单调递减？单调非递增？单调非递减？

规则为先进后出、后进先出的单调的数据结构，由于每个元素最多各自进出栈一次，所以单调栈的复杂度为`O(N)`

分析题目，`nums1`是`nums2`的子集，要将`nums1`的各个数带入`nums2`将原位置改为在`nums2`同位置·以后·找到的·比·其·大的数，找不到则将原位置改为-1。

我们可以对`nums2`预先进行处理，在`nums2`中，若是有数其前面的数都比自己大，后面的数都没自己大，那么这个数毫无用处，极端一点，当`nums`为非单调递增时，`nums1`结果返回的都是-1。

所以我们要倒序地将`nums2`处理为单调递增的数据。

同时题目对`nums2`有着严格的先后，只能向后找，所以使用栈来存储这个非单调递减的数据。

最终将`nums2`处理为等长的，对应下标存储着下一个更大的元素，若无则存储-1的数组

我们可以将`nums2`和处理后的`nums2`分别作为`key`和`value`存储进`HashMap`中，直接使用`nums1`中的各个值带入散列表查找即可。

~~~Java
class Solution {
    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
        int len1 = nums1.length, len2 = nums2.length;
        Map<Integer, Integer> map = new HashMap<>();
        Stack<Integer> stack = new Stack<>();
        for (int i = len2 - 1; i >= 0; i--) {
            while (!stack.isEmpty() && nums2[i] >= stack.peek()) {
                stack.pop();
            }
            map.put(nums2[i], !stack.isEmpty() ? stack.peek() : -1);
            stack.push(nums2[i]);
        }
        int[] res = new int[len1];
        for (int i = 0; i < len1; i++) {
            res[i] = map.get(nums1[i]);
        }
        return res;
    }
}
~~~



## 拓展

[LEETCODE.496.下一个更大元素Ⅰ](https://leetcode.cn/problems/next-greater-element-i/)