---
title: LEETCODE.剑指 Offer 40.最小的k个数
author: Pillow
tags:
  - 快排
  - 堆
categories:
  - 算法
abbrlink: 4265287101
date: 2023-02-18 17:40:00
---
# LEETCODE.剑指 Offer 40.最小的k个数

## 题目

输入整数数组 `arr` ，找出其中最小的 `k` 个数。例如，输入4、5、1、6、2、7、3、8这8个数字，则最小的4个数字是1、2、3、4。

## 示例

~~~
输入：arr = [3,2,1], k = 2
输出：[1,2] 或者 [2,1]
~~~

~~~
输入：arr = [0,1,2,1], k = 1
输出：[0]
~~~



## 题解

### 排序后提取

~~~Java
public static int[] getLeastNumbers1(int[] arr, int k) {
    Arrays.sort(arr);
    return Arrays.copyOfRange(arr, 0, k);
}
~~~

直接使用Arrays的方法可以通过，但是这是剑指Offer，作为面试题，考官明显目的不在此。

### 大顶堆

堆是一种非线性结构，是利用二叉树的结构来维护的一组基础数据结构，按照其特性可分为大顶堆和小顶堆。

大顶堆是每个结点的值都大于或者等于其左右叶子结点的数值，大数值会优先放在堆顶。

我们可以维护一个大小为`K`的大顶堆作为最终答案，初始化时先填入`arr`中的前K个数，然后遍历第`K+1`到`len-1`的数据，比大顶堆小替换掉堆顶数据维护即可，最后返回大顶堆。

~~~java
public static int[] getLeastNumbers3(int[] arr, int k) {
    int[] vec = new int[k]; // 返回结果vec
    if (k == 0) return vec; // 特殊情况判断
    PriorityQueue<Integer> queue = new PriorityQueue<Integer>(new Comparator<Integer>() {
        //            重写compare方法，返回正数交换o1、o2顺序，返回非正数不交换
        @Override
        public int compare(Integer o1, Integer o2) {
            return o2 - o1;
        }
    });
//        填入arr的前K个数
    for (int i = 0; i < k; ++i) {
        queue.offer(arr[i]);
    }
//        遍历剩余的数，进行比较替换，peek堆顶数值，poll抛出堆顶，offer填入堆中
    for (int i = k; i < arr.length; ++i) {
        if (queue.peek() > arr[i]) {
            queue.poll();
            queue.offer(arr[i]);
        }
    }
//        结果处理
    for (int i = 0; i < k; ++i) {
        vec[i] = queue.poll();
    }
    return vec;
}
~~~

时间复杂度为：`O(NlogN)`

空间复杂度为：`O(K)`，也就是`O(N)`

### 快排

先指定一个基准数，左哨兵一个个指比基准数小的数，右哨兵一个个指比基准数大的数，然后交换位置，最后将基准数放置中间，使得基准数左边的数都不比基准数大，基准数右边的数都不比基准数小，然后对基准数左右两侧再次使用快排，指定各自的基准数……

~~~Java
public static int[] getLeastNumbers2(int[] arr, int k) {
    quickSort(arr, 0, arr.length - 1);
    return Arrays.copyOf(arr, k);
}

private static void quickSort(int[] arr, int left, int right) {
    if (left >= right) return;
    int leftPort = left;
    int rightPort = right;
    while (leftPort < rightPort) {
        while (leftPort < rightPort && arr[rightPort] >= arr[left]) rightPort--; 
        //右哨兵开始寻找
        while (leftPort < rightPort && arr[leftPort] <= arr[left]) leftPort++; 
        // 左哨兵开始寻找
        swap(arr, leftPort, rightPort);
    }
    swap(arr, leftPort, left);
    quickSort(arr, 1, leftPort - 1);
    quickSort(arr, leftPort + 1, right);
}

private static void swap(int[] arr, int i, int j) {
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
~~~

时间复杂度为：`O(NlogN)`

空间复杂度为：`O(N)`

## 拓展

