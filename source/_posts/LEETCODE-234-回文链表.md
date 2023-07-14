---
title: LEETCODE.234.回文链表
author: Pillow
tags:
  - 链表
categories:
  - 算法
abbrlink: 1668203856
date: 2023-02-25 15:06:00
---
# LEETCODE.234.回文链表

## 题目

给你一个单链表的头节点 `head` ，请你判断该链表是否为回文链表。如果是，返回 `true` ；否则，返回 `false` 。

## 示例

~~~
输入：head = [1,2,2,1]
输出：true
~~~

~~~
输入：head = [1,2]
输出：false
~~~

### 进阶：你能否用 `O(n)` 时间复杂度和 `O(1)` 空间复杂度解决此题？

## 题解

### 反转比较

首先利用快慢指针获得链表中点，然后反转后半段链表，与总链表逐一比较，若无所不同则为回文链表，有所不同则不是反转链表。大致流程为：

~~~
head:1-2-3-4-3-2-1-null
slow:3-2-1-null
left:1-2-3-4-3-2-1-null
right:reverse(slow)=1-2-3-null
while(right!=null) {
	right.val.equil(left.val)
    right = right.next
    left = left.next
}
~~~

~~~java
class Solution {
    public boolean isPalindrome(ListNode head) {
        ListNode fast = head, slow = head;
        while(fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        if (fast != null) slow = slow.next;
        ListNode left = head;
        ListNode right = reverse(slow);

        while(right != null) {
            if (right.val != left.val) return false;
            right = right.next;
            left = left.next;
        }
        return true;
    }

    private ListNode reverse(ListNode list) {
        ListNode pre = null, cur = list;
        while(cur != null) {
            ListNode temp = cur.next;
            cur.next = pre;
            pre = cur;
            cur = temp;
        }
        return pre;
    }
}
~~~

>  有关链表反转的方法，在此做出解释
>
> `temp`暂存`cur.next`最后赋值给`cur`，用于使循环正常进行
>
> `pre`在每次循环取`cur`首结点值，并通过`cur.next=pre`相继拼在自己后面，完成反转

~~~
head = 1-2-3-null
pre的值经历了如下变换
null
1-null
2-1-null
3-2-1-null
cur的值经历了如下变换
1-2-3-null
1-null
2-3-null
2-1-null
3-null
3-2-1-null
~~~

----

### 比较暴力的方法

也可以先将链表转换为自己熟悉的数据结构，然后用自己熟悉的方法来判断回文子串：

1. 可以转换为数组或者库中的链表，然后利用双指针判断
2. 可以转换为字符串，回溯字符串后与源字符串比较
3. 可以转换为栈或者队列，然后利用其特性判断

#### 1.链表+双指针

*由于原链表长度难以确定，不推荐使用数组*

转换为库中自带的链表然后利用双指针从两边逐一比较

~~~Java
class Solution {
    public boolean isPalindrome(ListNode head) {
        List<Integer> list = new ArrayList<>();
        while (head != null) {
            list.add(head.val);
            head = head.next;
        }
        int left = 0, right = list.size() - 1;
        while (left < right)
            if (list.get(left++) != list.get(right--))
                return false;
        return true;
    }
}
~~~

#### 2.字符串回溯

*十分不推荐哦*

~~~Java
class Solution {
    public boolean isPalindrome(ListNode head) {
        StringBuilder nums = new StringBuilder();
        while (head != null) {
            nums.append(head.val);
            head = head.next;
        }
        return nums.toString().equals(nums.reverse().toString());
    }
}
~~~

#### 3.栈

~~~Java
class Solution {
    public boolean isPalindrome(ListNode head) {
        ListNode temp = head;
        Stack<Integer> stack = new Stack();
        while (head != null) {
            stack.push(head.val);
            head = head.next;
        }
        while (temp != null) {
            if (temp.val != stack.pop())
                return false;
            temp = temp.next;
        }
        return true;
    }
}
~~~

### 链表递归

递归要首先递去最深处有了结果时，才能够归来，比如：

~~~Java
public int test() {
    // 在递去时会执行的代码片段
    test();
    // 在归来时会执行的代码片段
}
~~~

所以我们能够反向打印链表：

~~~Java
public static void printListNode(ListNode head) {
    if (head == null) return;
    printListNode(head.next);
    System.out.println(head.val);
}
~~~

当然也能够比较是否是回文链表了：

~~~Java
class Solution {
    private ListNode frontPointer;

    public boolean isPalindrome(ListNode head) {
        frontPointer = head;
        return recursivelyCheck(head);
    }

    private boolean recursivelyCheck(ListNode currentNode) {
    if (currentNode == null) return true;
    boolean res = recursivelyCheck(currentNode.next) && (frontPointer.val == currentNode.val);
    frontPointer = frontPointer.next;
    return res;
    }
}
~~~



## 拓展

[LEETCODE.234.回文链表](https://leetcode.cn/problems/palindrome-linked-list/)

