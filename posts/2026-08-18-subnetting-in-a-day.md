---
title: "I learned subnetting in a day and got two things wrong"
date: 2026-08-18
description: "Picking a topic up fast is not the same as picking it up correctly. Two errors I couldn't see from the inside."
tags: ["networking", "fundamentals"]
draft: false
---

Everyone wants to learn things quickly. It's natural.

You want to show off that you can learn things quicker than everyone else, and thats exactly what I got wrong.
Yesterday I had my first interaction with binary numbers starting with simply learning how to convert 24 bit colours into binary numbers, then moved onto more complicated stuff. For example... Subnetting.

Imagine this, you have just been given a client IP address, and you need to figure out what hosts actually belong to them (and which dont) with this, you would grab the host, lets say for an example it's 205.64.12.101/21.
You would then use that to figure out where the host IPs start and end using binary.

For this example, here's how i would figure it out.

Firstly I know it will be 1 of 4 octets which group into groups of 8 octet 1 is 1-8, octet 2 is 9-16, etc...
Given the number is 21 we know it belongs to the 3rd octet. Meaning we will compare that number "12".
Secondly (and the way I work it out) is finding out how many bits to target which i would do 21-16=5 which equals 5 bits.
Next, the calculation. since we know we're comparing the 3rd octet, lets just work that one out.

I like to create a base plate to refer from
128 64 32 16 8 4 2 1

From this you just add the numbers until you reach your target of 12, which would look like this...
00001100

Then 5 bits would equal (00001) leaving the remaining 100.
To figure out how many available hosts there are you would do 32-21=11 then 2^11=2048
This means that there are 2048 hosts, minus the network and broadcast address, that leaves 2046 available hosts.

Now its time to figure out the start and end point.

we know the start point would leave the remaining at 000 which by using binary would give us the number of 8

So we know the first network address is 205.64.8.0

then the final broadcast address must equal 111 which would be 15 or in other words 205.64.15.255

So... Where did i go wrong?

1. **Host count.** I initially thought if you multiply the available 3rd octet with 255 which is the 4th, which in this case would be 15-8 = 7 then did 7x255 = 1,785. That's how many hosts there are. Instead, you always do 32-x (x being the number after your IP address which in this case was 21) Then always do 2^y (y being the number x equals)
2. **Terminology.** I wrote that the range ran from the "server" address to the "network" address. Both wrong, and backwards. `205.64.8.0` is the *network address*: all host bits zero, and it names the subnet itself rather than any machine on it. `205.64.15.255` is the *broadcast address*: all host bits one, and anything sent there reaches every host on the subnet. Neither is a server, and neither is a usable host. I knew to subtract two, and i knew the usable range was inside those endpoints. What I didn't have was the right names for them, which meant I couldn't have explained what I was subtracting or why.

What I'll do differently next time:
- **Pay attention to the terminology.** It's great to have an understanding what each thing is and does, however if you cant explain that in a debrief to a client then thats an obvious gap in knowledge to someone else who can.
- **Count host bits, not octets.** When figuring out how many available addresses there are work it out from the total of 32 bits rather than multiplying the difference.