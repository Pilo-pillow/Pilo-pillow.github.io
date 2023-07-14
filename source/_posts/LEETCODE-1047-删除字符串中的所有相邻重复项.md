title: LEETCODE.1047.删除字符串中的所有相邻重复项
author: Pillow
abbrlink: 3112647333
tags:
  - 栈
categories:
  - 算法
date: 2023-02-25 15:08:00
---
# LEETCODE.1047.删除字符串中的所有相邻重复项

## 题目

给出由小写字母组成的字符串 S，**重复项删除操作**会选择两个相邻且相同的字母，并删除它们。

在 S 上反复执行重复项删除操作，直到无法继续删除。

在完成所有重复项删除操作后返回最终的字符串。答案保证唯一。

## 示例

~~~
输入："abbaca"
输出："ca"
解释：
例如，在 "abbaca" 中，我们可以删除 "bb" 由于两字母相邻且相同，这是此时唯一可以执行删除操作的重复项。之后我们得到字符串 "aaca"，其中又只有 "aa" 可以执行重复项删除操作，所以最后的字符串为 "ca"。

~~~



## 题解

题目要求就像一个游戏一般《祖玛》


![upload successful](\\images\pasted-3.png\)

只不过各种颜色的球变为了26个小写的英文字母

和有效括号那一题很想，简单使用栈即可

### 栈

~~~Java
class Solution {
    public String removeDuplicates(String s) {
        Stack<Character> stack = new Stack<>();
        char[] chars = s.toCharArray();
        for (char ch : chars) {
            if (!stack.isEmpty() && ch == stack.peek()) {
                stack.pop();
                continue;
            }
            stack.push(ch);
        }
        StringBuilder res = new StringBuilder();
        while (!stack.isEmpty()) res.append(stack.pop());
        return res.reverse().toString();
    }
}
~~~

题目对于正序反序无要求，只要相邻即可消除，直接使用字符串进行逻辑判断也可以，也会更快。

~~~Java
class Solution {
    public String removeDuplicates(String s) {
        StringBuilder res = new StringBuilder();
        int top = -1;
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (top >= 0 && res.charAt(top) == ch) // 这里要先判断top是否大于等于0
                res.deleteCharAt(top--);
            else {
                res.append(ch);
                top++;
            }
        }
        return res.toString();
    }
}
~~~

