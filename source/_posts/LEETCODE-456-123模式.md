---
title: LEETCODE.456.123模式
author: Pillow
tags:
  - 栈
  - 单调栈
categories:
  - 算法
abbrlink: 3422526179
date: 2023-02-25 15:10:00
---
# LEETCODE.456.123模式

## 题目

给你一个整数数组 nums ，数组中共有 n 个整数。132 模式的子序列 由三个整数 nums[i]、nums[j] 和 nums[k] 组成，并同时满足：i < j < k 和 nums[i] < nums[k] < nums[j] 。

如果 nums 中存在 132 模式的子序列 ，返回 true ；否则，返回 false 。

## 示例

### 示例1

~~~
输入：nums = [1,2,3,4]
输出：false
解释：序列中不存在 132 模式的子序列。
~~~

### 示例2

~~~
输入：nums = [3,1,4,2]
输出：true
解释：序列中有 1 个 132 模式的子序列： [1, 4, 2] 。
~~~

### 示例3

~~~
输入：nums = [-1,3,2,0]
输出：true
解释：序列中有 3 个 132 模式的的子序列：[-1, 3, 2]、[-1, 3, 0] 和 [-1, 2, 0] 。
~~~



## 题解

在此重新说一下子序列的概念，子序列并不一定相邻，只是相对位置不被破坏。

使用：

~~~Java
class Solution {
    public boolean find132pattern(int[] nums) {
        for (int i = 0; i < nums.length - 2; i++) {
            if (nums[i] < nums[i + 1] && nums[i + 1] > nums[i + 2] && nums[i] < nums[i + 2]) return true;
        }
        return false;
    }
}
~~~

在示例`[3,5,0,3,4]`返回`false`，`[3,5,4]`也属于`123parttern`

使用三重循环，时间复杂度为`O(n^3)`，n最大为`2*10^5`，必定超时

与其说是132模式，不如用198模式更好说明。

题目要求找到满足`nums[i] < nums[k] < nums[j]`以及`i < j < k`的`i`，`j`，`k`。

`nums[j]`是最大的数，`nums[k]`是`nums[j]`右侧仅次于其大的数，`nums[i]`只需要找`nums[j]`左侧是否有比`nums[k]`小的`nums[i]`即可。

比较好的方式还是遍历一遍数据将这三个数找到，就需要找到维护这三个数的方式。

优先寻找最大的`nums[j]`，其次是第二大的`nums[k]`，最后只要找到比`nums[k]`小的`nums[i]`即可返回`true`了。

那么逐一循环进行查找可以吗？

~~~java
public boolean find123pattern(int[] nums) {
    int max = Integer.MIN_VALUE, mid = Integer.MIN_VALUE, j = 0;
    for (int l = 0; l < nums.length; l++)
        if (nums[l] > max) {
            max = nums[l];
            j = l;
        }
    for (int l = j; l < nums.length; l++)
        if (nums[l] < max)
            mid = Math.max(mid, nums[l]);
    for (int l = 0; l < j; l++)
        if (nums[l] < mid) return true;
    return false;
}
~~~

当`[1,3,2,4,5,6,7,8,9,10]`

对数据进行反序遍历

用单调栈维护最大的`nums[j]`

用最大值比较维护栈抛出的次大值`nums[k]`

最后只要找的比次大值`nums[k]`小的`nums[i]`即可返回`true`

~~~java
class Solution {
    public boolean find132pattern(int[] nums) {
        Stack<Integer> stack = new Stack<>();
        int k = Integer.MIN_VALUE;
        for (int i = nums.length - 1; i >= 0; i--) {
            if (nums[i] < k) return true;
            while (!stack.isEmpty() && nums[i] > stack.peek())
                k = Math.max(k, stack.pop());
            stack.push(nums[i]);
        }
        return false;
    }
}
~~~



