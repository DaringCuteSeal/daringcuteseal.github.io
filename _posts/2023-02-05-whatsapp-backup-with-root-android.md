---
title: WhatsApp Backup with Root Acess (Android)

excerpt: "I'm so fed up with What$App! Why can't they implement an actually good back up solution?!?! And I can ask my school to use something else instead?!?!! Ugh."
tag:
- howto
- software
---

![f\*ck whatsapp](/blog/image/whatsapp.png)

I'm so fed up with What$App! Why can't they implement an actually good back up solution?!?! And can I ask my school to use something else instead?!?!! Ugh.

Anyways, I've been looking for a container/virtualization solution for Android to run proprietary apps securely for a while now, and I recently found [Shelter](https://github.com/PeterCxy/Shelter) which is a perfect app for that! It creates a separate "work" container profile that has its own files and app data, plus we can switch off the work container to prevent apps there from collecting our data.

And then, comes the time of migrating my apps. I cloned WhatsApp from the Shelter app. For the backup, I tried so many ways, but none of them seemed to work. Copying `WhatsApp` folder from my internal personal storage to `Android/media/com.whatsapp/Whatsapp` on my work storage seem to make WhatsApp recognize my backup, however, it failed to actually restore the backup.

# Guide
## File Paths
Here are some file path informations that you probably need:
- `/data/data/` or `/data/user/0/` is the app data path for our PERSONAL profile.
- `/data/user/10/` is the app data path for our WORK profile.
- `/data/media/0` is the internal storage for our PERSONAL profile.
- `/data/media/10` is the internal storage for our WORK profile.

**Note: the ID for work profile (in this example, 10) could be different but I'm unsure about that. If the `10` folder does not exist for you, try a different number other than 0.**

## Steps
So, here's what I ended up doing (requires root shell):

1. Install WhatsApp on *WORK* profile.
2. Copy WhatsApp's `files` and `databases` folder from *PERSONAL* profile's app data path (from `/data/data/com.whatsapp` or `/data/user/0/com.whatsapp`) to *WORK* app data path (`/data/user/10/com.whatsapp`). If the folders already exist, delete them first.
3. Take a look at the *WORK* WhatsApp data folders owner (any folder/file other than `files` and `databases` which is still owned by root for now). Here's an example:
    ```
    ginkgo:/ # ls -lh /data/user/10/com.whatsapp/
    total 12K
    drwxrwx--x  2 u10_a182 u10_a182_cache 3.4K 2023-02-04 22:41 app_minidumps
    drwxrws--x 16 u10_a182 u10_a182_cache 3.4K 2023-02-05 11:17 cache
    drwxrws--x  2 u10_a182 u10_a182_cache 3.4K 2023-02-04 22:39 code_cache
    drwxrwx--x  2 u10_a182 u10_a182_cache 3.4K 2023-02-05 10:50 databases
    drwxrwx--x 15 u10_a182 u10_a182_cache 3.4K 2023-02-05 11:24 files
    drwx------  2 u10_a182 u10_a182_cache 3.4K 2023-02-04 22:41 lib-main
    drwxrwx--x  2 u10_a182 u10_a182_cache 3.4K 2023-02-05 07:07 no_backup
    drwxrwx--x  2 u10_a182 u10_a182_cache 3.4K 2023-02-05 11:19 shared_prefs

    ```

4. Change the `files` and `databases` owner to the previous owner we've checked, recursively. In this case, it is `u10_a182:u10_a182_cache`. Run `chown -R u10_a182:u10_a182_cache /data/user/10/com.whatsapp{files,databasea}`.
5. Set up WhatsApp on the *WORK* profile normally. It won't prompt you for any backup restore, but after the entire process is done, you should see your previous chat history.


Hope this helps someone! And again, 🖕 WhatsApp. Make an option for the user to pick a backup path or something.
