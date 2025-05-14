# File Manger

A simple cli interface for organizing files in a dist directory. The goal of this is to explore recreating bash like file management syntax in node. Another part of this - arguably the part I'm most interested in is using streams along with taking information from the user.

## Operations
- `pwd`: print working directory
- `ls`: list contents of this or specified directory
- `mkdir`: create a directory with a given name (error handle to make user give dirname)
- `touch: similar as makedir but creates a file
- `cp`: copy a file. make use of streams. if name already exists add number to end
- `head`: print the first 15 lines of a file to the console (tab through rest?)
- `tail`: opposite of head
- `less`: forward and backward navigation, search option, switch to editor, home and end buttons top to bottom. 15 line increments
- `mv`: move a file or rename a file
- `rm`: remove a file. force flag, recursion flag for folder.  
- `cd`: change browser from one directory to another
- `help`, `h`: help documentation. mimic a manpage
- `exit`: exit console.
- `editor`: open file in default system editor
- `clear`: clear console of content
- `empty`: delete the trash can

### Startup script requirements
- interactive console
- verification logic
- mkdir command
- ls command
- exit

### Interactive logic requirements
- file manipulation
- movement
- keybindings for less
- create a trash can if one doesnt exist
- add deleted content to trash can
- prompt to clear trash at end of session

### Interesting features
- stream print content like how an ai works for reading long files.
- compress trash
- ownership editing

## User flow:
1. **run script**: creates dist folder and gives you option to initialize a set of directories or not, verification logic used at end.
2. open console, user is able to run commands
3. when deleting, creates a trash that you can clear later.
4. user has a full console and wants to clear it
5. user is searching through a file and needs to be able to tab effeciently
---

## Resources
- [Node 22 fs promises docs](https://nodejs.org/docs/latest-v22.x/api/fs.html#file-system)

