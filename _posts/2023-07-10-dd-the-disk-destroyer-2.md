---
title: "Fixing a Corrupted, DD'ed ext4 Partition - DD The Disk Destroyer Part 2"
tag:
- linux
- data
- disk
- partition
- filesystem

---

Guess what happened yesterday? Yep—another data loss! Seems like the Universe really wants me to be grateful of *actually owning some valuable data* once every while, eh?

Yesterday, I was trying to write a Fedora ISO to my flashdisk. Ironically, I felt really confident ([check the first part of this blog too](/blog/dd-the-disk-destroyer)) because I now use NVMe drive as my main hard drive so no more typing the muscle memorized `/dev/sda`. HOWEVER, apparently my flash disk didn't get detected when it was plugged. After I plugged that flashdisk, I plugged my secondary backup hard disk which kinda has some important stuff in it (to move the Fedora ISO later on).

Yeah, the backup hard disk became `/dev/sda`, which I thought was my flash disk. I don't know how but I didn't notice that there's only one SCSI disk attached when I ran `lsblk` 😎💪 Smortass me. I ended up overwriting like 2 gigs of data from the start of my backup disk with the Fedora ISO. *Oh, wait, FEDORA? IT'S ALMOST LIKE YOU ARE ALWAYS THE ONE THAT CAUSES DATA LO-* 

# My Disk Layout
Here's how my disk was and is partitioned (`sudo sfdisk -d /dev/sdX`):

```
label: gpt
label-id: 44466694-E988-47B3-9D03-5290330536CC
device: /dev/sda
unit: sectors
first-lba: 34
last-lba: 3906963422
sector-size: 512

/dev/sda1 : start=        2048, size=  3435919360, type=0FC63DAF-8483-4772-8E79-3D69D8477DE4, uuid=AFD48525-F0AB-41B1-99C5-F93441E73D48, name="WD"
/dev/sda2 : start=  3435921408, size=   143362048, type=EBD0A0A2-B9E5-4433-87C0-68B6B72699C7, uuid=6DCE17DE-8CBA-48C0-B405-0F7851523812, name="Misc"
/dev/sda3 : start=  3579283456, size=   122880000, type=0FC63DAF-8483-4772-8E79-3D69D8477DE4, uuid=A7497AD6-DABD-4E43-87E2-A6F5B835F550, name="LFS"
/dev/sda4 : start=  3702163456, size=   102400000, type=0FC63DAF-8483-4772-8E79-3D69D8477DE4, uuid=8A627947-C312-48CD-9332-6301549B4A86, name="gentoo-linux"
/dev/sda5 : start=  3804563456, size=   102397952, type=0FC63DAF-8483-4772-8E79-3D69D8477DE4, uuid=5115691E-DF9E-487E-8013-DEF1924AD0CE, name="artix-linux"
```

I overwrote 2 gigs of data from the start of the disk, so that means I destroyed the partition table and rendered the first partition inaccessible and corrupted.

As for the partition table, I'm safe because I kept a backup of my disk layout (restore with `sfdisk`) :D if you don't keep a backup and you lost your disk layout, try remaking the partitions manually.

**Pro tip: make drive layout backups too. They're as important as the usual file backups.**

**Pro tip #2: always make space at the start of your disk 🤠**

# Supablocks
After a bit of research, I found that ext4 partitions have [super blocks](https://ext4.wiki.kernel.org/index.php/Ext4_Disk_Layout#The_Super_Block) that's spread out evenly accross the file system. The super block that starts at location 0 (start of partition) which is the primary super block and is the default to be used. More backup super blocks are located afterwards. Since I have destroyed my primary super block, I just need to fix the file system according to a backup super block.

# Fixing With `fsck`

First of all, we need to know which super block to use. You can run...

```
mke2fs -n /dev/sdX
```

(`n` option to list backup super blocks and not actually setup a new file system) to check all the available backup super blocks. Then, we can run `e2fsck` like so:

```
e2fsck -b SUPERBLOCK /dev/sdX
```

replace SUPERBLOCK with the super block you want. You'd probably want the super block that's located near the partition start (one with the lowest number). Also, since it might take forever to answer the prompts given by fsck, you might want to pass the `y` option too so fsck will automatically assume yes to all prompts (generally safe).


# End Thoughts
uhh

it was a creepy experience

And I swear that the next time I'm using `dd`, I will use `/dev/disk/by-id/*` instead of the direct `/dev/*`.