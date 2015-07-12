shell.Js
================

## About

Micro Library for getting a shell-like experience in the browser via canvas.

v .02 - hooks for wire-up into other applications.  (and unwiring when done).
v .01 - very basic support for 'help', executing functions with parameters, and recall of previous commands.

## Why

My gravity simulator had 20 key bindings, and I couldn't support calling functions with parameters via key binding alone.  

I want support for users to have a shell mode where they can call a list of supported commands and execute them as needed.

## Using

pass an array of actions, with the form:
	{command: 'name', description: 'help text', fn: function}


## Goals

Discoverability
Usability