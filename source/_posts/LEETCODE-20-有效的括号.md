---
title: LEETCODE.20.有效的括号
author: Pillow
tags:
  - 栈
category:
  - 算法
abbrlink: 2007562703
date: 2023-01-06 09:59:00
---
# LEETCODE.20.有效的括号

## 题目

给定一个只包括 `'('`，`')'`，`'{'`，`'}'`，`'['`，`']'` 的字符串 `s` ，判断字符串是否有效。

有效字符串需满足：

1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。
3. 每个右括号都有一个对应的相同类型的左括号。

## 实例

~~~
输入：s = "()"
输出：true
~~~

~~~
输入：s = "()[]{}"
输出：true
~~~

~~~
输入：s = "(]"
输出：false
~~~



## 题解

同种括号有先后顺序，`(`，`[`，`{`要分别在`)`，`]`，`}`的前面：`)(`，`][`，`}{`是错误的；

不同种的括号也有先后顺序，哪种左括号先出现，其对应的右括号就最后出现：`([{)]}`是错误的；

每种括号都是成对的：`(]){`是错误的。

满足三种条件的数据结构其特点是：先进后出——对应**栈**以及**队列**。

~~~
创建栈，开始循环字符串，若字符为三种括号的左括号之一，则将其压入栈中，若不是左括号，则将其转换为对应的左括号并与栈顶的符号进行比较，比较结果若相同，栈顶元素抛出，比较结果不相同，说明这个字符是个错的，字符串无效，如果字符串遍历完全后栈内为空，则字符串有效。需要注意，如果字符串第一个字符为右括号，那么此时栈内为空，却还要抛出元素，就会程序异常。所以在抛出前加上条件栈不为空即可。
~~~

~~~Java
class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for(char c:s.toCharArray()){
            if(c=='('||c=='['||c=='{') stack.push(c);
            else if(!stack.isEmpty()&&reverse(c)==stack.peek()) stack.pop();
            else return false;
        }
        return stack.isEmpty();
    }
    static char reverse(char c){
        switch(c){
            case ')': return '(';
            case ']': return '[';
            default: return '{';
        }
    }
}
~~~



## 拓展

`LEETCODE.1541.平衡括号字符串的最少插入次数`

`LEETCODE.921.使括号有效的最少添加`