---
title: Google CodeJam 2016 Qualification
id: google-codejam-2016-qualification-round
created: 2016-04-10
updated: 2016-04-10
categories:
  - Note
tags:
  - Java
  - Google
cover: ./cover.png
---

# Google CodeJam 2016 Qualification

今早结束的 Google CodeJam 2016 资格赛. 由于智商问题和加班了一天,所以只能水出前面两道水题. 但是还是稍微涨了点姿势. 记录下解题的过程和一些小彩蛋.

将我的 A 和 B 的 Solution 放在[Github](https://github.com/Aquariuslt/CodeJam)上了.

## A: Counting Sheep

### Problem Description

Bleatrix Trotter the sheep has devised a strategy that helps her fall asleep faster. First, she picks a number N. Then she starts naming N, 2 × N, 3 × N, and so on. Whenever she names a number, she thinks about all of the digits in that number. She keeps track of which digits (0, 1, 2, 3, 4, 5, 6, 7, 8, and 9) she has seen at least once so far as part of any number she has named. Once she has seen each of the ten digits at least once, she will fall asleep.

Bleatrix must start with N and must always name (i + 1) × N directly after i × N. For example, suppose that Bleatrix picks N = 1692. She would count as follows:

N = 1692. Now she has seen the digits 1, 2, 6, and 9. 2N = 3384. Now she has seen the digits 1, 2, 3, 4, 6, 8, and 9. 3N = 5076. Now she has seen all ten digits, and falls asleep. What is the last number that she will name before falling asleep? If she will count forever, print INSOMNIA instead.

Input

The first line of the input gives the number of test cases, T. T test cases follow. Each consists of one line with a single integer N, the number Bleatrix has chosen.

Output

For each test case, output one line containing Case #x: y, where x is the test case number (starting from 1) and y is the last number that Bleatrix will name before falling asleep, according to the rules described in the statement.

Limits

1 ≤ T ≤ 100. Small dataset

0 ≤ N ≤ 200. Large dataset

0 ≤ N ≤ 10^6. Sample

Input

```
5
0
1
2
11
1692
```

Output

```
Case #1: INSOMNIA
Case #2: 10
Case #3: 90
Case #4: 110
Case #5: 5076
```

In Case #1, since 2 × 0 = 0, 3 × 0 = 0, and so on, Bleatrix will never see any digit other than 0, and so she will count forever and never fall asleep. Poor sheep! In Case #2, Bleatrix will name 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. The 0 will be the last digit needed, and so she will fall asleep after 10. In Case #3, Bleatrix will name 2, 4, 6... and so on. She will not see the digit 9 in any number until 90, at which point she will fall asleep. By that point, she will have already seen the digits 0, 1, 2, 3, 4, 5, 6, 7, and 8, which will have appeared for the first time in the numbers 10, 10, 2, 30, 4, 50, 6, 70, and 8, respectively. In Case #4, Bleatrix will name 11, 22, 33, 44, 55, 66, 77, 88, 99, 110 and then fall asleep. Case #5 is the one described in the problem statement. Note that it would only show up in the Large dataset, and not in the Small dataset.

### Translation

这道题相当容易读懂,表面意思就是: 一个叫`Bleatrix`的家伙睡觉之前喜欢数羊咩,但是他要数到一定条件才睡得着. 他每次会从一个数字`N`开始数.第一下数`N`,第二下数`2*N`...第 M 下数`M*N`. 当从开始数到后面,一直到出现过的数字包含了`1234567890`所有数字的时候就会睡着了. 求的是数字`N`对应的让他能够睡着的那个数.

### Solution

做法是用一个从 N 开始枚举. 出现过的数字用`HashSet`来保存,每出现一个数字的时候,将该数字按照每一位拆分,打进这个`HashSet`里面. 当`HashSet`的长度大于等于 10 的时候跳出循环.

### Source Code

```java
package com.aquariuslt.codejam;

import com.aquariuslt.codejam.utils.Reader;

import org.junit.Test;

import java.io.InputStream;
import java.util.HashSet;
import java.util.Set;

/** Created by Aquariuslt on 4/9/16.*/
public class CountingSheep {
    private static int numberOfCases;
    private static int startSheepNumber[];
    private static int result[];


    private static void input(){
        InputStream inputStream = ClassLoader.getSystemResourceAsStream("A/A-large.in");
        Reader.init(inputStream);
        try{
            numberOfCases = Reader.nextInt();
            startSheepNumber = new int[numberOfCases];
            result = new int[numberOfCases];
            for(int i=0;i<numberOfCases;i++){
                startSheepNumber[i] = Reader.nextInt();
            }
        }
        catch (Exception e){
            //Do nothing
        }

    }

    private static void solve(){
        for(int i=0;i<numberOfCases;i++){
            result[i] = solveSingleNumber(startSheepNumber[i]);
        }
    }

    private static int solveSingleNumber(int singleNumber){
        Set<Integer> digitalSet = new HashSet<>();
        if(singleNumber==0){
            return 0;
        }
        else{
            int currentNumber = singleNumber;
            while(digitalSet.size()<10){
                digitalSet.addAll(convertIntToDigitalSet(currentNumber));
                currentNumber += singleNumber;
            }
            return currentNumber;
        }
    }

    private static Set<Integer> convertIntToDigitalSet(int number){
        int currentNumber = number;
        Set<Integer> digitalSet = new HashSet<>();
        while(currentNumber/10>0){
            digitalSet.add(currentNumber % 10);
            currentNumber = currentNumber/10;
        }
        return digitalSet;
    }

    private static void output(){
        for(int i=0;i<numberOfCases;i++){
            if(result[i] == 0){
                System.out.printf("Case #%d: INSOMNIA\n",(i+1));
            }
            else{
                System.out.printf("Case #%d: %d\n",(i+1),result[i]);
            }
        }
    }


    @Test
    public void testCountingSheep() {
        input();
        solve();
        output();
    }
}

```

## B: Revenge of the Pancakes

### Problem Description

The Infinite House of Pancakes has just introduced a new kind of pancake! It has a happy face made of chocolate chips on one side (the "happy side"), and nothing on the other side (the "blank side").

You are the head waiter on duty, and the kitchen has just given you a stack of pancakes to serve to a customer. Like any good pancake server, you have X-ray pancake vision, and you can see whether each pancake in the stack has the happy side up or the blank side up. You think the customer will be happiest if every pancake is happy side up when you serve them.

You know the following maneuver: carefully lift up some number of pancakes (possibly all of them) from the top of the stack, flip that entire group over, and then put the group back down on top of any pancakes that you did not lift up. When flipping a group of pancakes, you flip the entire group in one motion; you do not individually flip each pancake. Formally: if we number the pancakes 1, 2, ..., N from top to bottom, you choose the top i pancakes to flip. Then, after the flip, the stack is i, i-1, ..., 2, 1, i+1, i+2, ..., N. Pancakes 1, 2, ..., i now have the opposite side up, whereas pancakes i+1, i+2, ..., N have the same side up that they had up before.

For example, let's denote the happy side as + and the blank side as -. Suppose that the stack, starting from the top, is --+-. One valid way to execute the maneuver would be to pick up the top three, flip the entire group, and put them back down on the remaining fourth pancake (which would stay where it is and remain unchanged). The new state of the stack would then be -++-. The other valid ways would be to pick up and flip the top one, the top two, or all four. It would not be valid to choose and flip the middle two or the bottom one, for example; you can only take some number off the top.

You will not serve the customer until every pancake is happy side up, but you don't want the pancakes to get cold, so you have to act fast! What is the smallest number of times you will need to execute the maneuver to get all the pancakes happy side up, if you make optimal choices?

Input

The first line of the input gives the number of test cases, T. T test cases follow. Each consists of one line with a string S, each character of which is either + (which represents a pancake that is initially happy side up) or - (which represents a pancake that is initially blank side up). The string, when read left to right, represents the stack when viewed from top to bottom.

Output

For each test case, output one line containing Case #x: y, where x is the test case number (starting from 1) and y is the minimum number of times you will need to execute the maneuver to get all the pancakes happy side up.

Limits

1 ≤ T ≤ 100. Every character in S is either + or -.

Small dataset

1 ≤ length of S ≤ 10. Large dataset

1 ≤ length of S ≤ 100. Sample

Input

```
5
-
-+
+-
+++
--+-
```

Output

```
Case #1: 1
Case #2: 1
Case #3: 2
Case #4: 0
Case #5: 3
```

In Case #1, you only need to execute the maneuver once, flipping the first (and only) pancake. In Case #2, you only need to execute the maneuver once, flipping only the first pancake. In Case #3, you must execute the maneuver twice. One optimal solution is to flip only the first pancake, changing the stack to --, and then flip both pancakes, changing the stack to ++. Notice that you cannot just flip the bottom pancake individually to get a one-move solution; every time you execute the maneuver, you must select a stack starting from the top. In Case #4, all of the pancakes are already happy side up, so there is no need to do anything.(这里他们打错成`anthing`了.) In Case #5, one valid solution is to first flip the entire stack of pancakes to get +-++, then flip the top pancake to get --++, then finally flip the top two pancakes to get ++++.

### Translation

这道题原意是这样子的: 大概就是翻蛋糕.给出一个字符串,只包含`-`和`+`两个部分 分别代表正面和反面. 如果给出的字符串是`--+-` 那么在实际中,蛋糕的摆放会是这样子的:

反面朝上反面朝上正面朝上反面朝上 _---我是底盘---_ _-我是伺应的手-_

有一个铲子每次都能够在两层蛋糕之间插入,然后将这个铲上面的所有蛋糕一次铲起来! 接着将这些铲起来的蛋糕连着一起反过来,再放回盘子上.

目标是给出一个这样排列的蛋糕序列,求用铲子操作多少次能够将蛋糕全部变成向上的状态.

### Solution

有一种思路就是从右往左开始遍历,当遇到目前一个层次是反面的时候,就进行一次`翻面`操作. 为了记录当前一个蛋糕的面实际是向上还是向下,我设定了一个 flag 与最原先输入的当前蛋糕面状态进行异或操作,得到当前面的状态.

即

```
private int solveSingleCase(int[] pancakeArray) {
    int revengeCount = 0;
    int revengeFlag = 0;
    for (int pancakeLength = pancakeArray.length, i = pancakeLength - 1; i >= 0; i--) {
        if ((pancakeArray[i] ^ revengeFlag) == 0) { //通过异或得出当前的面实际朝向.
            revengeCount++;
            revengeFlag = 1 - revengeFlag;
        }
    }
    return revengeCount;
}
```

### Source Code

```java
package com.aquariuslt.codejam;

import com.aquariuslt.codejam.utils.Reader;

import org.junit.Test;

import java.io.IOException;
import java.io.InputStream;

/** Created by Aquariuslt on 4/9/16.*/
public class RevengePancakes {
    private static final int MAX_STRING_LENGTH = 101;

    private int caseCount;
    private int[][] pancakeIntArray;
    private int[] result;

    private void input() {
        InputStream inputStream = ClassLoader.getSystemResourceAsStream("B/B-large.in");
        Reader.init(inputStream);
        try {
            caseCount = Reader.nextInt();
            result = new int[caseCount];
            pancakeIntArray = new int[caseCount][MAX_STRING_LENGTH];
            for (int i = 0; i < caseCount; i++) {
                String currentPancakeString = Reader.next();
                pancakeIntArray[i] = convertStringToInt(currentPancakeString);
            }
        } catch (IOException e) {
            //e.printStackTrace();
        }

    }

    private int[] convertStringToInt(String currentPancakeString) {
        int currentPancakeStringLength = currentPancakeString.length();
        int[] currentPancakeIntArray = new int[currentPancakeStringLength];
        for (int i = 0, strLength = currentPancakeString.length(); i < strLength; i++) {
            currentPancakeIntArray[i] = currentPancakeString.charAt(i) == '+' ? 1 : 0;
        }
        return currentPancakeIntArray;
    }

    private void solve() {
        for (int i = 0, length = result.length; i < length; i++) {
            result[i] = solveSingleCase(pancakeIntArray[i]);
        }
    }

    private int solveSingleCase(int[] pancakeArray) {
        int revengeCount = 0;
        int revengeFlag = 0;
        for (int pancakeLength = pancakeArray.length, i = pancakeLength - 1; i >= 0; i--) {
            if ((pancakeArray[i] ^ revengeFlag) == 0) {
                revengeCount++;
                revengeFlag = 1 - revengeFlag;
            }
        }
        return revengeCount;
    }

    private void output() {
        for (int i = 0; i < caseCount; i++) {
            System.out.printf("Case #%d: %d\n", (i + 1), result[i]);
        }
    }


    @Test
    public void testRevengePancakes() {
        input();
        solve();
        output();
    }
}


/**
 * if '-' means '0', '+' means '1' we can convert case to: Case 1: input : -            0 target: +
 * 1
 *
 * Case 2: input : -+           01 target: ++           11
 *
 * Case 3: input : +-           10 target: ++           11
 *
 * Case 4: input : +++          111 target: +++          111
 *
 * Case 5: input : --+-         0010 target: ++++         1111
 */
```

## Java Reader in ACM

本来一直在用`Java的Scanner做input`. 但是一直没想过如果正式比赛还真的有人用 Java 去提交,那么`Scanner`的性能到底如何呢. 很久之前看过一篇文章比较`cin`和`scanf`的性能. 然后看到了这篇文章,通过数据比较高呼`Java Scanner is Slooooow`

[Faster Input for Java](https://www.cpe.ku.ac.th/~jim/java-io.html)

通过比较 Java 的`Scanner`与`BufferedReader` + `StringTokenizer`来比较性能的话. 证明了`Scanner`读入输入流相对要慢 4 倍.

所以我在代码里面第一次使用了这种方式

```java
public class Reader {
    private static BufferedReader reader;
    private static StringTokenizer tokenizer;

    /** call this method to initialize reader for InputStream */
    public static void init(InputStream input) {
        reader = new BufferedReader(
                     new InputStreamReader(input) );
        tokenizer = new StringTokenizer("");
    }

    /** get next word */
    public static String next() throws IOException {
        while ( ! tokenizer.hasMoreTokens() ) {
            tokenizer = new StringTokenizer(
                   reader.readLine() );
        }
        return tokenizer.nextToken();
    }

    public static int nextInt() throws IOException {
        return Integer.parseInt( next() );
    }

    static double nextDouble() throws IOException {
        return Double.parseDouble( next() );
    }
}
```

然后将输入文件放在 resource 里面,将输入流直接改成 resource 即可. Usage:

```java
public class CountingSheep{

    private static void input(){
        InputStream inputStream = ClassLoader.getSystemResourceAsStream("A/A-large.in");
        Reader.init(inputStream);
        try{
            numberOfCases = Reader.nextInt();
            startSheepNumber = new int[numberOfCases];
            result = new int[numberOfCases];
            for(int i=0;i<numberOfCases;i++){
                startSheepNumber[i] = Reader.nextInt();
            }
        }
        catch (Exception e){
            //Do nothing
        }
    }
}
```
