---
title: "Quick Publishing Workflow for Windows"
date: 2025-12-25
description: "Methods for efficiently creating and committing notes and pages on Windows, including clipboard-based and external publishing options."
tags:
  - workflow
  - windows
  - productivity
  - automation
---

## Overview

This note documents several approaches for quickly publishing content to this site from a Windows machine, ranging from simple clipboard-based methods to fully automated pipelines.

## Method 1: Clipboard to Note (Fastest)

Use PowerShell to grab clipboard content and create a new note instantly.

### One-Liner Script

```powershell
# Save as publish-clip.ps1
$date = Get-Date -Format "yyyy-MM-dd"
$slug = Read-Host "Enter slug"
$title = Read-Host "Enter title"
$content = Get-Clipboard
$frontmatter = @"
---
title: "$title"
date: $date
---

$content
"@
$path = "src/content/notes/$date-$slug.md"
$frontmatter | Out-File -FilePath $path -Encoding utf8
git add $path && git commit -m "note: $title"
Write-Host "Created and committed: $path"
```

### Usage

1. Copy your content to clipboard (from anywhere - browser, Word, etc.)
2. Run: `.\publish-clip.ps1`
3. Enter slug and title when prompted
4. Done - file created and committed

## Method 2: External Markdown Editor

Use a dedicated markdown editor that can save directly to the repo folder.

### Recommended Tools (Free/Open Source)

| Tool | Features | Link |
|------|----------|------|
| **Obsidian** | Vault-based, plugins, graph view | [obsidian.md](https://obsidian.md) |
| **Typora** | WYSIWYG, clean UI | [typora.io](https://typora.io) |
| **Mark Text** | Open source, distraction-free | [github.com/marktext/marktext](https://github.com/marktext/marktext) |
| **VS Code** | Extensions, git integration | Built-in |

### Obsidian Setup

1. Create a new vault pointing to `src/content/notes/`
2. Install the "Templater" plugin
3. Create a template with frontmatter:

```markdown
---
title: "{{title}}"
date: {{date:YYYY-MM-DD}}
tags: []
---

{{content}}
```

4. Use Ctrl+N to create new notes with the template

## Method 3: Windows Terminal Alias

Add to your PowerShell profile (`$PROFILE`):

```powershell
function New-Note {
    param(
        [Parameter(Mandatory)]
        [string]$Slug,
        [string]$Title = $Slug
    )
    $date = Get-Date -Format "yyyy-MM-dd"
    $path = "C:\Users\thoma\Projects\readme-pages\src\content\notes\$date-$Slug.md"
    $content = @"
---
title: "$Title"
date: $date
tags: []
---

"@
    $content | Out-File -FilePath $path -Encoding utf8
    code $path  # Opens in VS Code
}

Set-Alias nn New-Note
```

### Usage

```powershell
nn my-new-note "My New Note Title"
# Creates file and opens in VS Code
```

## Method 4: GitHub Web Interface (No Local Repo)

Publish from anywhere without cloning the repo:

1. Go to your repo on GitHub
2. Navigate to `src/content/notes/`
3. Click "Add file" → "Create new file"
4. Name it `YYYY-MM-DD-slug.md`
5. Paste content with frontmatter
6. Commit directly

Works from any browser, phone, or computer.

## Method 5: Git + Clipboard Automation with AutoHotkey

Create a global hotkey that captures clipboard and creates a note:

```autohotkey
; Save as publish-note.ahk
#n::  ; Win+N triggers
    clipboard := ClipboardAll
    InputBox, slug, New Note, Enter slug (lowercase-with-dashes):
    InputBox, title, New Note, Enter title:

    FormatTime, date,, yyyy-MM-dd
    path := "C:\Users\thoma\Projects\readme-pages\src\content\notes\" . date . "-" . slug . ".md"

    frontmatter := "---`ntitle: """ . title . """`ndate: " . date . "`n---`n`n"

    FileAppend, %frontmatter%%clipboard%, %path%, UTF-8

    Run, git add "%path%" && git commit -m "note: %title%", C:\Users\thoma\Projects\readme-pages
    MsgBox, Created: %path%
return
```

## Method 6: Quick Commit Script

For when you've already created files manually:

```powershell
# Save as quick-commit.ps1
$files = git status --porcelain | Where-Object { $_ -match "notes/" -or $_ -match "pages/" }
if ($files) {
    git add src/content/notes/* src/content/pages/*
    $msg = Read-Host "Commit message"
    git commit -m $msg
    Write-Host "Committed!"
} else {
    Write-Host "No new content files to commit."
}
```

## Recommended Workflow

For daily use, I recommend combining:

1. **Obsidian** vault pointing to `src/content/notes/` for drafting
2. **PowerShell alias** (`nn`) for quick notes from terminal
3. **Clipboard script** for capturing content from other apps
4. **GitHub web** for mobile/emergency edits

## Tips

- Keep a template note in clipboard history (Win+V) for quick pasting
- Use VS Code's "Paste Image" extension to quickly add screenshots
- Set up a Windows Scheduled Task to auto-commit at end of day
- Consider using `draft: true` frontmatter for work-in-progress content
