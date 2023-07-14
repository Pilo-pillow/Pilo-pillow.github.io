---
title: LEETCODE.15.三数之和
author: Pillow
tags: []
categories: []
abbrlink: 1010291496
date: 2023-01-12 23:08:00
---
# LEETCODE.15.三数之和

## 题目

给你一个整数数组 `nums` ，判断是否存在三元组 `[nums[i], nums[j], nums[k]]` 满足 `i != j`、`i != k` 且 `j != k` ，同时还满足 `nums[i] + nums[j] + nums[k] == 0` 。请

你返回所有和为 `0` 且不重复的三元组。

**注意：**答案中不可以包含重复的三元组。

## 示例

~~~
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
解释：
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
注意，输出的顺序和三元组的顺序并不重要。
~~~

~~~
输入：nums = [0,1,1]
输出：[]
解释：唯一可能的三元组和不为 0 。
~~~

~~~
输入：nums = [0,0,0]
输出：[[0,0,0]]
解释：唯一可能的三元组和为 0 。
~~~



## 题解

此为一类题型，给出`target`值，然后根据条件选出`n`个数，其和为`target`，返回这`n`个数。

思路为**排序**+**指针遍历**。

对于此题先进行初始判断，若是数组长度小于3，那么输出为`[]`。

对数组进行排序，若是第一个数`nums[0] > 0`，那么同样输出为`[]`。

之后定义左右两个指针`left = nums[i+1]`，`right = nums[nums.length-1]`。

判断指针所指与`nums[i]`相加是否为0，是则返回这三个数并跳过之后与指针所指值相同的数并且两指针规律移动，若不是，则根据三者的和是否大于0来判断指针移动，小于0左指针右移，大于0右指针左移。

~~~Java
public static List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> lists = new ArrayList<>();
        Arrays.sort(nums);
        int len = nums.length;
        if (len < 3) return lists;
        for (int i = 0; i < len; i++) {
            if (nums[i] > 0) return lists;
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int left = i + 1;
            int right = len - 1;
            int cur = nums[i];
            while (left < right) {
                int temp = cur + nums[left] + nums[right];
                if (temp == 0) {
                    List<Integer> list = new ArrayList<>();
                    list.add(cur);
                    list.add(nums[left]);
                    list.add(nums[right]);
                    lists.add(list);
                    while (left < right && nums[left + 1] == nums[left]) left++;
                    while (left < right && nums[right - 1] == nums[right]) right--;
                    left++;
                    right--;
                } else if (temp < 0) left++;
                else right--;
            }
        }
        return lists;
    }
~~~



## 拓展

可用于解决所有的`nSum`问题