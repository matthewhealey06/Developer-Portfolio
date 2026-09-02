---
title: "TryHackMe Taught Me Linux, Then Showed Me Windows."
date: 2026-09-01
description: "The Windows material I found taught me to click through Settings. That is not what I needed."
tags: ["OS", "fundamentals", "windows"]
draft: false
---

When studying, you dont often think how important it is to learn one thing before the other. Nor do you think that the material which is being taught will negatively impact your learning.

This is exactly what happened to me.

## Where it started

When i first started learning Pentesting, specifically the OS side of learning, I took the "smart" path and made the decision to learn Linux before Windows.\
It made sense, statisically most Pentesters use Linux, and its also the most customisable, so why wouldn't I learn that first?

And while that may be true Windows and Linux taught me 2 completely different things.

So I worked through TryHackMe's Linux Fundamentals rooms, then moved onto Windows Fundamentals. Same platform, same path, same word in the title.

### Let's start with Linux

In the Linux fundamentals, it taught me what is important. How to effectively get around the file system without the need for the mouse. You do this using the command line\
With such things like:

```
 touch  create a file
 ls     show the list of files
 cat    display files content
 nano   create or edit a file

 and flags such as:

 -a    show all
 -l    show list
 -h    human readable
```
Small commands, but they compose. `ls -la` isn't four things to memorise,
it's one thing plus modifiers, and once you have that you can read commands
you've never seen.


### What Windows fundamentals gave me instead

Windows fundamentals started me with the visuals, the settings, the task manager, the resource monitor. And while it's not useless, I found it was weirdly so much more simple yet so much more complicated.

Naturally, I grew up using computers and so I got used to the Windows UI, and since I used to be the one in the family to troubleshoot any other issues, I naturally found out about task manager, device manager, settings, security, etc...

The course was showing me around a house I've lived in for years; so it taught me (alomst) nothing\
Every time it needed me to open something, it told me to use Windows search. Task Manager, Device Manager, Services, Event Viewer. Search, click, look at the panel. Here's what it never showed me:

| GUI            | Shell                    |
| -------------- | ------------------------ |
| Task Manager   | `Get-Process` / `tasklist` |
| Services       | `Get-Service` / `sc query` |
| Event Viewer   | `Get-WinEvent`           |
| Local Users    | `Get-LocalUser` / `net user` |
| Firewall       | `Get-NetFirewallRule`    |
| Disk Management| `Get-Disk` / `Get-Volume` |
| System Info    | `systeminfo`             |

The right hand column is the only one that works when you don't have a desktop. It's also the column the Linux rooms had spent the previous week teaching me the equivalent of.


and when I did try to use the command prompt to shortcut my path; I found out instead of `'-a' its '/all'`. Instead of `'../' its '..\'` which on a very basic fundamental, even from VSCode, is unfamilar with me.

#### What I think should've been covered

*Not the UI* - A Pentester needs to learn the parts of Windows that doesn't have an icon. Services, how they start. Commands, what they do. But most importantly how to make the same change from the command line instead of the GUI.

But more specifically the same things which were covered just 3 lessons before in the Linux fundamentals. Show the difference, and help me understand where and when I would use each one.

# Final Points

I came into this thinking my mistake was the order. Linux first, Windows second, and I'd made it harder for myself.

I don't think that any more. Learning Linux first is the only reason I noticed anything was wrong. If I'd done Windows first I'd have finished the module, felt like I understood the OS, and never questioned why a fundamentals course spent its time in Settings. Linux gave me a standard to measure against.

The order wasn't the problem. The material was.