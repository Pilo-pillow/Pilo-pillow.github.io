---
title: LEETCODE.53.最大子数组和
author: Pillow
tags:
  - 滑动窗口
  - 动态规划
categories:
  - 算法
abbrlink: 697894122
date: 2023-01-07 16:29:00
---
# LEETCODE.53.最大子数组和

## 题目

给你一个整数数组 `nums` ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

**子数组** 是数组中的一个连续部分。

## 示例

~~~
输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
输出：6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
~~~

~~~
输入：nums = [1]
输出：1
~~~

~~~
输入：nums = [5,4,-1,7,8]
输出：23
~~~



## 题解

### 滑动窗口

两个指针的中间区域称为窗口，其滑动对应着指针的移动

使用滑动窗口时，需要知道：

1. 何时扩大窗口？
2. 何时缩小窗口？
3. 何时更新答案？

当右指针小于数组长度时，右指针右移扩大窗口，然后计算窗口内数值总和，并更新最大值，那么什么时候窗口收缩呢？

我们要通过窗口内数值总和来求出答案，所以收缩的条件一定与窗口内数值总和有直接关系。

如果窗口内数值总和大于记录的最大值，答案更新了是不是就可以缩小窗口进行下一次最大值尝试了？第一次扩大窗口一定会更新答案，也就是说，窗口一定收缩，就会将数组中的第一个数值跳过，显然是不行的。

如果窗口内的数值总和大于0，此时让右指针右移进行尝试，若总和小于0，则让左指针右移进行尝试，若是数组内都是负数，则最终会求出最大的负数。若是组内都是正数，则会是整个数组。正常情况，算法只有在窗口元素和大于0时才会不断扩大窗口，并在窗口扩大时更新答案，本质实在穷举所有正数开头的子数组，并寻找子数组和最大的那个，即正确答案。

~~~java
public static int maxSubArray1(int[] nums) {
        int left = 0, right = 0;
        int temp = 0, max = Integer.MIN_VALUE;
        while (right < nums.length) {
            temp += nums[right++];
            max = Math.max(temp, max);
            while (temp < 0) {
                temp -= nums[left];
                left++;
            }
        }
        return max;
    }
~~~

### 动态规划

动态规划的核心：遍历其所有**[状态]**，做出最佳**[选择]**。

#### 如何定义状态？

既然要遍历所有状态，那么将状态定义何时会使得遍历的效率更加高。

我们将`dp[i]`定义为以`nums[i]`为结尾的连续子数组的最大和，其结果由之前的`dp[i-1]`得出，以此类推，直到初始状态。

如果`dp[i-1] > 0`，则`dp[i] = dp[i-1] + nums[i]`。也就是继续加入数值，用以得到更大的连续子数组。

如果`dp[i-1] <= 0`，则`dp[i] = nums[i]`。此时`nums[i]`加上前面的`dp[i-1]`也不会变得更大，于是`dp[i]`断了与之前子数组的练习，重新进行累加。

汇总到一起并简化就是：`dp[i] = max{dp[i-1] + nums[i], nums[i]}`。

#### 那么初始值如何定义？

`dp[0]`指以`nums[0]`结尾的连续子数组的最大和，也就是`dp[0] = nums[0]`。

#### 做出选择？

最终结果便是找出最大的`dp[i]`并返回。

#### 空间优化？

`dp[i]` 仅仅和 `dp[i-1]` 的状态有关，可压缩空间。

~~~java
// 优化前
public static int maxSubArray2(int[] nums) {
        int len = nums.length;
        int[] dp = new int[len];
        dp[0] = nums[0];
        int max = nums[0];
        for (int i = 1; i < len; i++) {
            dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
            max = Math.max(dp[i], max);
        }
        return max;
    }
~~~

~~~java 
// 优化后
public static int maxSubArray3(int[] nums) {
        int pre = 0;
        int res = nums[0];
        for (int num : nums) {
            pre = Math.max(pre + num, num);
            res = Math.max(res, pre);
        }
        return res;
    }
~~~

