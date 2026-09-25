---
title: "I searched up the answer, and still got it wrong."
date: 2026-09-25
description: "Sometimes searching up the answer doesnt get you closer but confuses you even more"
tags: ["networking", "fundamentals", "nmap"]
draft: false
---

Sometimes when you're learning, you want to give up and just search the answer.

Today I found out, that isn't always the best idea.

Todays lesson starts on Hack The Box, specifically "Firewall and IDS/IPS Evasion"  
The question mentions "our client wants to know if it is possible to find out our target's DNS server version"

Here was the process:  
## Phase 1:

**Full TCP Scan**  
Initially, I started simple, I wanted to get an understanding for what ports are open, closed, or filtered. To do this i ran `nmap 10.129.184.96 -n -sV -v` and got this result:

![response from above nmap prompt](/public/images/posts/09-25(01).png)

Then once doing a bit more research into ports using [this](https://web.archive.org/web/20240315102711/https://packetlife.net/media/library/23/common-ports.pdf). I found out that port 53; the one which is filtered, is DNS and therefore the one I want to focus on.

Naturally, I tried another very simple prompt... `nmap 10.129.184.96 -n -sV -p 53 -sA` after a quick scan it let me know to try -Pn; so I tried that `nmap 10.129.184.96 -n -sV -p 53 -sA -Pn`. Yet still, the port shows up as filtered. (if only I knew how close I really was...) You see, had i changed `-sA` to `-sU` changing it from TCP ACK to UDP, It would have opened the port, yet still not quite give me the answer.  

Nevertheless
## Phase 2:

**The Search**  
After trying a few more additions, thinking maybe I was being too "noisy" I tried additions such as `--disable-arp-ping` and `-packet-trace`. Once they didn't work, I was confused, not knowing where to go, or what to do next. So naturally to learn more, I searched the question.  
The first result was a [Hack The Box Forum](https://forum.hackthebox.com/t/answer-of-firewall-and-ids-ips-evasion-medium-lab/282536) which claimed a prompt of `nmap -T4 -p53 -A -v 10.129.67.225 -D RND:5 --stats-every=5s` shows the exact answer which I'm looking for.  
"Ah! So infact, I needed to be more agressive." I thought. Pasted it into my terminal and... 

Nothing.  
The same error as before, the same message I'm used to.

So I worked my way down, through the comments; "surely one of them has to work right?"  
I went through 1, 3, 5. Yet, still.. The same result. So I stopped. Exited the forum and just thought...

The forum was full of commands that worked for other people and not me. Instead of pasting a tenth one, I asked: what do the working ones share that mine don't? Reading them properly, the tell was the protocol. The commands lived on TCP; a couple that mentioned UDP or -sU were the ones that fit. DNS runs on UDP/53. Every scan I'd run was TCP. That was the wall.

## Phase 3:

**The 2 False Starts**  
It was at this moment I got the closest. In fact I tried the right command `sudo nmap 10.129.184.96 -sU -p 53 -sV` once again just missing the -Pn. So I added it, waited and got no response for 50 seconds. Thinking its broken, I exited and started looking for more solutions.

Had I just waited, the response would have been right infront of me. I exited a scan because it looked frozen. It wasn't broke. It was just loading.

## Phase 4:
**The Realisation (and the win)**  
After a bit more thinking, looking over the results again, I felt that maybe I needed to just let the result run through, see the answer, if its filtered again, try something else. So that's what I did. 1 final command `sudo nmap -sU -sC -sV -p53 -Pn -n 10.129.184.96`

Finally..
![final result](/public/images/posts/25-09(02).png)

## Phase 5:

**Why It Worked**  
DNS runs on *UDP/53*, not TCP. Every earlier scan was TCP and TCP/53 stays filtered because TCP only handles zone transfers. Scan UDP and the door was open.

I'm stil unsure why this title was "Firewall and IDS/IPS Evasion" as, to me - it didn't feel like much evasion was needed. Maybe that's what caused the confusion, but I shouldve tested that first.

In summary, I searched the answer and still got it wrong. Then I stopped searching, started thinking, and it took about a minute to realise the answer was right infront of me.