title: LEETCODE.49.字母异位词分组
author: Pillow
tags:
  - 哈希表
categories:
  - 算法
abbrlink: 264599127
date: 2023-01-28 16:58:00
---
# LEETCODE.49.字母异位词分组

## 题目

给你一个字符串数组，请你将**字母异位词**组合在一起。可以按任意顺序返回结果列表。

**字母异位词** 是由重新排列源单词的字母得到的一个新单词，所有源单词中的字母通常恰好只用一次。

## 示例

~~~
输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
~~~

~~~
输入: strs = [""]
输出: [[""]]
~~~

~~~
输入: strs = ["a"]
输出: [["a"]]
~~~



## 题解

根据数据特征进行分类，应该想到使用散列表，也就是哈希表。

哈希表分三部分：键值（key）、函数（hash）、数据（value）组成

哈希表主要做三件事情：增添数据、删除数据、查找数据

增添数据便是将数据代入哈希函数，生成对应的键值，将数据存入

删除数据便是将数据带入哈希函数，根据结果删除键值对应的数据

查找数据也是将数据带入哈希函数，生成键值，根据键值找到数据

具体例子可以查看拓展里的给出的开放式哈希表动态展示。

总的来说，只要两个数据的键值相同，便可根据键值找到他们，也就是可以以此对数据进行分类。

字母异位词便是本题数据的共同特征，要根据这个特征进行分类。

我们要思考的就是如何让字母异位词的共同特征成为键值，对数据进行分类归纳，得出答案。

### 排序

将数组中的字符串转换为字符数组，然后进行排序，排序结果一致的字符串即相互为字母异位词，排序结果作为键值存储字符串即可

~~~Java
public static List<List<String>> groupAnagrams1(String[] strs) {
//        创建哈希表
        Map<String, List<String>> map = new HashMap<>();
//        对所有字符串进行判断处理
        for (String str : strs) {
//            转换为字符数组
            char[] chars = str.toCharArray();
//            对字符数组进行排序，字母异位词的排序结果一致
            Arrays.sort(chars);
//            以排序结果作为键值
            String key = new String(chars);
//            将此词存储到键值中，有则存储，无则创建
            List<String> list = map.getOrDefault(key, new ArrayList<>());
            list.add(str);
//            添加到哈希表中
            map.put(key, list);
        }
//        返回结果集
        return new ArrayList<List<String>>(map.values());
    }
~~~

### 计数

创建长度26的普通数组，对字符串的字符进行计数编码，例如`abcb`就是`|1|2|1|0|0|...`，`bbce`就是`|0|2|1|0|1|0|0|...`，编码结果一致的字符串相互为字母异位词，编码结果作为键值存储字符串即可。

~~~Java
public static List<List<String>> groupAnagrams2(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String str : strs) {
            String code = encode(str);
            map.putIfAbsent(code,new ArrayList<>());
            map.get(code).add(str);
        }
        return new ArrayList<List<String>>(map.values());
}

private static String encode(String str) {
    char[] count = new char[26];
    for (char ch : str.toCharArray()) {
        int delta = ch - 'a';
        count[delta]++;
    }
    return new String(count);
}
~~~

------------------------------

无论是排序还是计数都是对字符串进行了重编码，然后根据重编码后的结果进行归纳，当然编码格式有很多，只要能正确分类字母异位词即可。

将字符串字符转换为进制代码或者数字会更快，但是无法正确分类；当然也有很复杂的编码格式，虽然正确但是很复杂很慢，自行斟酌即可。

### 拓展

[OpenHashing](https://www.cs.usfca.edu/~galles/visualization/OpenHash.html)动态展示