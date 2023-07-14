---
title: LEETCODE.445.两数相加Ⅱ
author: Pillow
tags:
  - 链表
  - 栈
categories:
  - 算法
abbrlink: 2830404484
date: 2023-02-25 15:10:00
---
# LEETCODE.445.两数相加Ⅱ

## 题目

给你两个 非空 链表来代表两个非负整数。数字最高位位于链表开始位置。它们的每个节点只存储一位数字。将这两数相加会返回一个新的链表。

你可以假设除了数字 0 之外，这两个数字都不会以零开头。

## 示例

### 示例1

~~~
输入：l1 = [7,2,4,3], l2 = [5,6,4]
输出：[7,8,0,7]
~~~

### 示例2

~~~
输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[8,0,7]
~~~

### 示例3

~~~Java
输入：l1 = [0], l2 = [0]
输出：[0]
~~~

进阶：如果输入链表不能够翻转该如何解决？

## 题解

不能够翻转链表？使用栈即可

先将两个链表转换为栈，然后进行相加操作，最后返回答案即可

~~~Java
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        Stack<Integer> s1 = new Stack<>();
        while (l1 != null) {
            s1.push(l1.val);
            l1 = l1.next;
        }
        Stack<Integer> s2 = new Stack<>();
        while (l2 != null) {
            s2.push(l2.val);
            l2 = l2.next;
        }
        ListNode dummy = new ListNode(-1);
        int carry = 0;
        while (!s1.isEmpty() || !s2.isEmpty() || carry > 0) {
            int val = carry;
            if (!s1.isEmpty()) val += s1.pop();
            if (!s2.isEmpty()) val += s2.pop();
            carry = val / 10;
            val = val % 10;
            ListNode newNode = new ListNode(val);
            newNode.next = dummy.next;
            dummy.next = newNode;
        }
        return dummy.next;
    }
}
~~~

要注意虚拟头节点的使用