---
title: "Beantextures Devlog 2 - A Smarter Move"
toc: true
tag:
- programming
- devlog
- python
---

YEEEEHAWWW! Okay so, the holiday finally came. Well not really, this is actually a free gap time before my graduation.. aww I'm gonna graduate to high school soon :( (and force my uncreative hands to make flower bouquets.. 😵🤫 which I want to just postpone but it's coming after me soon!) <small>(edit: now my school is forcing everyone to buy REAL flowers! 😡)</small>

Oh and fun fact, my graduation will be held at the same date I started using Artix Linux 3 years ago 😁

...but enough of that, let's talk about Beantextures v3™. Or [Beantextures v2 first if you haven't read my previous blog](https://daringcuteseal.github.io/blog/beantextures-devlog-1/).

# Little Blender Secret (Or a "TIL")

While I was scrolling through Blender's documentations again, I realized that [their documentation for property definitions](https://docs.blender.org/api/current/bpy.props.html) mentions this:

> Custom properties can be added to any subclass of an `ID`, `Bone` and `PoseBone`.

Which sounds like you can only add custom properties to anything inheriting those type subclasses.

Except that, *you kinda can attach it to everything, really*. In my case, I have to attach some custom properties on node group instances (`bpy.types.ShaderNodeGroup`) which have `ShaderNode`, `NodeInternal`, `Node`, and `bpy_struct` base classes. Yeah, apparently, you can attach properties to any subclasses of `bpy_struct` , which includes.. gasp gasp, everything. Yay! No more headaches.

```python
>>> bpy.types.SoundSequence.abc = bpy.props.BoolProperty()
>>> bpy.types.SubsurfModifier.abc = bpy.props.BoolProperty()
>>> bpy.types.Sequence.abc = bpy.props.BoolProperty()
>>> # Hell yeah!
```


*"And why did you think that it was impossible?"* you may ask. I'm guessing that my subconscious self copied the same rules for pointer properties (`bpy.props.PointerProperty`/`bpy.types.PointerProperty`)—you can only use instances with the `bpy.types.ID` superclass (class for data-blocks). It's not true, so I'm safe this time!

# Completely New Approach!

Let me tell you, this method is really smart <small>(in theory, I haven't tested everything though)</small>. My previous Beantextures rewrite has custom logic for everything, instead of utilizing several versatile built-in Blender features. This time, I'm learning from my mistakes. Instead of writing my own logic to change an image node (`bpy.types.ShaderNodeTexImage`)'s image texture selection, Beantextures v.3 is going to generate node groups for you! Yep, that's right, node groups with nodes like this:

![An example of a Beantextures node tree](/blog/image/beantextures-2-node_tree.png)

Basically, here's the idea: This add-on is gonna have 3 different components—the node generator, the bone-node connector, and the pose mode UI for when the user is on pose mode. Same idea as our old Beantextures—but this time we make raw node groups, then make a tool to expose input property of the instances of those node groups for individual bones.

But first, 💙 Data Structuring. 💙

# A New and Flawless (Maybe) Data Structure

Instead of having individual bones storing the actual data needed for Beantextures to work and then a frame change hook that lets Beantextures pick which image should be used for a particular animation frame, we just use Beantextures as a generator that can generate "baked" node groups for us—therefore letting Blender do all the heavy lifting for the image picking.

Ah yeah, and by the way, the storage logic for this rewrite ensures that even if you duplicate things, nothing will break. Because.. that's right, we don't have to keep track of lists anymore (that we have to update manually and are unreliable).

## Under Node Groups

You can make custom nodes on Blender under the node editor, called node groups. Here's an example:

![A node group](/blog/image/node-group.png)

They're built with several other nodes behind the scene, like so:

![A node group's tree](/blog/image/node-group-tree.png)


By default, Blender stores custom-made node groups under `bpy.data.node_groups`. Well, technically we're storing node trees (`bpy.types.NodeTree`) under `bpy.data.node_groups`, but by Blender's naming conventions, it seems that they call every user-made node trees a "node group". These node groups can then be instanced with its own set of user-set values—with independent input values from other node group instances and its template node group.

![Node group instance](/blog/image/beantextures-2-node-instance.png)

The node above is a `ShaderNodeGroup`, just another subclass of `ShaderNode`—same type as other shader nodes you can find on the shader node editor (the Image Texture node, the Principled BSDF shader, etc). **Yes, artists who don't care about all of this, that thing above is just a node group you're familiar with**, for the shader node editor and other node editors (like compositor nodes, geometry nodes, whatever). But anyways, this particular node holds the special property `node_tree`, which tells the node how to, well, be a node. Essentially, the node will copy many attributes from its template `node_tree` (our custom node group) and modifies some values of its own properties, for example, its `inputs`.

![How a ShaderNodeGroup node relates to its node group](/blog/image/beantextures-2-node-tree-relations.png)


Anyways, first task: make sure that we can identify which node group is user-made and which is generated by Beantextures. Obviously, we have no way to be 100% sure about that (because Beantextures generated node groups and other node groups have no differences), but we will just add a `is_beantextures` boolean property for every node groups (that property will be under `bpy.type.NodeTree`). So when we generate a Beantextures node group, we can set that `is_beantextures` to `True`, and make sure to never expose that property to the user interface so no one can change it manually.

Sorry, no visualization, that one should be easy.

Second, we have to talk about the enum relationing from our previous Beantextures reading. You see, custom node (trees) on Blender don't have a built-in enum type for the input socket. There's only `int`, `color`, `float`, `vector`, `bool`, and `shader`. We can't just expose the integer and display that as an enum, so we have to make a custom property that sort of drives the input value. I decided to add an extra Beantextures-related properties under `bpy.types.NodeTree` that holds its linking type (renamed from "relationing type") and an array of enum items represented as a bunch of names and indices which we can use to generate items for a real enum property later on. This way, each instances can have its own enum property that all share the same items, but can have different selection from those items.

![Node-related custom properties](/blog/image/beantextures-2-node-props.png)

FUUUGHHHHHHH my brain just simulated Blender and made that entire logic above in a few minutes in the bathroom, by the way 😭 And then this blog took forever to write because of my communication skill issue™. I wish I can just.. like, transfer my thoughts here instantly :\

The node group generation itself should be straightforward, but we need the data needed to generate those node groups first. Yes, we will now work on the panel for configuring the generated nodes.

## (Copied) Generator UI

Well, this new panel is just copied (with some tweaks and improvements) from our old Beantextures v.2 settings panel. But yea, this time, I moved the panel to the node editor sidebar (the right panel). Also, settings are now stored per-scene instead of per-bone (although generated node groups are always available on the same file).

So here: 

![Node generator UI](/blog/image/beantextures-2-node-generator-ui.png)

Yes, it's a clone from my previous version. But it works! :)

Logic still works the same as the panel from my previous version, except with some differences:
- Switching linking ("relationing") type does not remove all of your set values. All it does is show the different properties, so when you switch the link type back, you will still have your old values. *I was actually just lazy to reimplement the whole switch and delete everything logic, but then I thought, "hey, this is gonna be a cool feature!"*
- Fallback image option now exists, so when the user inputs an invalid value/index to the Beantextures node group, the node group will output whatever that fallback image is set to (just black if not set).
- New linking type: *simple int*! Bind one integer to an image, simple as that.
- *Finally*, you can have a button that clears all the set configurations for you.

# End Thoughts
Okay, this is gonna be fun, see you next time when I finish the actual node group generators! 💫🪐
