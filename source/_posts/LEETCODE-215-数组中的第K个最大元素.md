title: LEETCODE.215.数组中的第K个最大元素
author: Pillow
tags:
  - 快排
  - 堆
  - 优先队列
categories:
  - 算法
abbrlink: 3879140556
date: 2023-02-18 17:36:00
---
# LEETCODE.215.数组中的第K个最大元素

## 题目

给定整数数组 `nums` 和整数 `k`，请返回数组中第 `k `个最大的元素。

请注意，你需要找的是数组排序后的第 `k` 个最大的元素，而不是第 `k `个不同的元素。

你必须设计并实现时间复杂度为 `O(n)` 的算法解决此问题。

## 示例

~~~
输入: [3,2,1,5,6,4], k = 2
输出: 5
~~~

~~~
输入: [3,2,3,1,2,4,5,5,6], k = 4
输出: 4
~~~



## 题解

### 一般快排选择

先排序后返回倒数第k个位置的数值，此时平均时间复杂度为`O(NlogN)`，不符合题意。

快速排序是一个典型的分治算法，快排每次会指定一个`pivot`作为基准，排序一遍将数据分为两部分，其中一部分小于`pivot`的同时又小于另一部分，这时就可以确定`pivot`所处位置的正确。

若是排序为非递减，那么只要只要`pivot`所在下标等于`nums.length - k`我们就可以确定`pivot`为第k大的数，若是`pivot`下标小于`nums.length - k`，证明第k大的数在`pivot`的右半部分，只需递归右部分；若是`pivot`下标大于`nums.length - k`，证明第k大的数在`pivot`的左半部分，只需递归左部分。

~~~java 
public class Solution {
    public int findKthLargest(int[] nums, int k) {
        int l = 0, r = nums.length - 1, tar = nums.length - k;
        while (true) {
            int pi = quickSelect(nums, l, r, tar);
            if (pi == tar) return nums[tar];
            else if (pi < tar) l = pi + 1;
            else r = pi - 1;
        }
    }

    private int quickSelect(int[] a, int l, int r, int k) {
        int p = a[l];
        int j = l, i = l + 1;
        for (; i <= r; i++)
            if (a[i] < p)
                swap(a, ++j, i);
        swap(a, l, j);
        return j;
    }

    private void swap(int[] a, int x, int y) {
        int temp = a[x];
        a[x] = a[y];
        a[y] = temp;
    }
}
~~~



### 随机快排选择

选取`pivot`的方法有很多，可以是区间内的任一个，选取`pivot`的方法对排序的时间性能有着决定性的影响，为避免其时间复杂度从`O(NlogN)`退化为`O(N^2)`，我们在实现快速选择时随机化选择基准值`pivot`。



~~~Java
public class Solution {
    private static final Random random = new Random(System.currentTimeMillis());

    public int findKthLargest(int[] nums, int k) {
        int l = 0, r = nums.length - 1, tar = nums.length - k;
        while (true) {
            int pi = quickSelect(nums, l, r, tar);
            if (pi == tar) return nums[tar];
            else if (pi < tar) l = pi + 1;
            else r = pi - 1;
        }
    }

    private int quickSelect(int[] a, int l, int r, int k) {
        int ra = random.nextInt(r - l + 1) + l;
        swap(a, ra, l);
        int p = a[l];
        int j = l, i = l + 1;
        for (; i <= r; i++)
            if (a[i] < p)
                swap(a, ++j, i);
        swap(a, l, j);
        return j;
    }

    private void swap(int[] a, int x, int y) {
        int temp = a[x];
        a[x] = a[y];
        a[y] = temp;
    }
}
~~~

时间复杂度为`O(N)`

### 双路随机快排选择

`堆Buff`

只是更改了`partition`寻找·范围内·随机数的·正确下标的·方式，利用两个指针从范围区间的两边开始找，左指针找出所有比基准值大的数，右指针找到所有比基准值小的数，两者交换；区间不成立时停止，然后将基准值与左指针减一的数交换让其处于正确的位置，返回基准值正确下标，交由`quickSelect`判断选择递归。

~~~Java
class Solution {
    private static final Random random = new Random();

    public int findKthLargest(int[] nums, int k) {
        return quickSelect(nums, 0, nums.length - 1, nums.length - k);
    }

    private int quickSelect(int[] nums, int left, int right, int k) {
        if (left >= right) return nums[k];
        while (true) {
            int pivotIndex = partition(nums, left, right, k);
            if (pivotIndex == k) return nums[pivotIndex];
            else return pivotIndex > k ? quickSelect(nums, left, pivotIndex - 1, k) : quickSelect(nums, pivotIndex + 1, right, k);
        }
    }

    private int partition(int[] nums, int left, int right, int k) {
        int randomIndex = left + random.nextInt(right - left + 1);
        swap(nums, left, randomIndex);
        int pivot = nums[left];
        int ll = left + 1;
        int rr = right;
        while (ll <= rr) {
            while (ll <= rr && nums[ll] < pivot) ll++;
            while (ll <= rr && nums[rr] > pivot) rr--;
            if (ll >= rr) break;
            swap(nums, ll, rr);
        }
        swap(nums, left, ll - 1);
        return ll - 1;
    }

    private void swap(int[] nums, int x, int y) {
        int temp = nums[x];
        nums[x] = nums[y];
        nums[y] = temp;
    }
}
~~~



### 优先队列

维护一个大小为K的小顶堆，堆顶为堆内最小元素，每次添加一个元素，抛出顶部元素，最后堆内剩下的K个数则是最大的K个数，返回堆顶即可。

~~~java
class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> priorityQueue = new PriorityQueue<>();
        for (int num : nums) {
            priorityQueue.offer(num);
            if (priorityQueue.size() > k) priorityQueue.poll;
        }
        return priorityQueue.peek();
    }
}
~~~

时间复杂度为`O(NlogK)`

## 拓展

[LEETCODE.215.数组中的第K个最大元素](https://leetcode.cn/problems/kth-largest-element-in-an-array/)

### 基本快速选择的弊端

快速选择会进行递归操作，但是如果每次递归某一边元素的数量远大于另一边元素的数量，这样递归所提高的效率就会减少，极端的例子就是`{1,2,3,4,5,6,7,9,8}`基本每次递归都只会减少一个元素，这样时间复杂度就会坍缩为`O(N^2)`，为了避免这样，我们需要尽量让递归的两个区间保持数量上的平衡，称之为递归平衡。

### 随机基准数

为了在多数已经排序的时候保证递归平衡来提高效率，引入随机基准数，原来我们一般将左端`left`元素作为基准数在基本有序数组例子上会递归不平衡，我们在确定基准数之前将`left`元素与范围内随即元素交换，这样可以在很大程度上减小这类极端例子所带来的影响。

### 双路查找

当数组中有很多相同元素时，例如`{1，2，2，2，2，2，2，2，2，1，3}`，即使引入了随机基准数，仍旧会造成递归不平衡，（基本每次递归都会仅减少一个元素）为了解决问题，引入了双路查找（叫法不统一，理解即可），在查找大小两区间的数时不再仅从一边寻找，而是从两边开始，在左右两个指针不构成合理区间时再将基准值放在正确位置，这样就可以让相等的元素平均地分布在基准值的两侧，保证了递归平衡。

### 三路快排

三路快排的思路是将与基准值相等的元素集中在小区间与大区间之间，其效率和双路接近，这里不再赘述。

详细的各类快排可以参考我的另一篇博客 [快速排序详解]()