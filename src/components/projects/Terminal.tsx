"use client";
import React, { useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock: React.FC<{ code: string }> = ({ code }) => (
  <SyntaxHighlighter language="go" style={dracula} className="rounded-lg overflow-x-auto my-4 p-6">
    {code}
  </SyntaxHighlighter>
);

const TerminalEmulatorTutorial: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="font-sans max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8 mt-16">Building a Terminal Emulator in Go</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Introduction</h2>
        <p>
          This tutorial builds on the concepts of the TTY subsystem to create a simple terminal emulator in Go using the Fyne UI toolkit.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">User Interface</h2>
        <p>
          We'll start by creating a basic UI with Fyne:
        </p>
        <CodeBlock code={`package main

import (
  "fyne.io/fyne/v2"
  "fyne.io/fyne/v2/app"
  "fyne.io/fyne/v2/layout"
  "fyne.io/fyne/v2/widget"
)

func main() {
  a := app.New()
  w := a.NewWindow("germ")

  ui := widget.NewTextGrid()
  ui.SetText("I'm on a terminal!")

  w.SetContent(
    fyne.NewContainerWithLayout(
      layout.NewGridWrapLayout(fyne.NewSize(420, 200)),
      ui,
    ),
  )

  w.ShowAndRun()
}`} />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Pseudoterminal</h2>
        <p>
          Next, we connect to the TTY driver using a pseudoterminal:
        </p>
        <CodeBlock code={`package main

import (
  "os"
  "os/exec"
  "time"

  "fyne.io/fyne/v2"
  "fyne.io/fyne/v2/app"
  "fyne.io/fyne/v2/layout"
  "fyne.io/fyne/v2/widget"
  "github.com/creack/pty"
)

func main() {
  a := app.New()
  w := a.NewWindow("germ")

  ui := widget.NewTextGrid()
  ui.SetText("I'm on a terminal!")

  c := exec.Command("/bin/bash")
  p, err := pty.Start(c)

  if err != nil {
    fyne.LogError("Failed to open pty", err)
    os.Exit(1)
  }

  defer c.Process.Kill()

  p.Write([]byte("ls\r"))
  time.Sleep(1 * time.Second)
  b := make([]byte, 1024)
  _, err = p.Read(b)
  if err != nil {
    fyne.LogError("Failed to read pty", err)
  }
  ui.SetText(string(b))
  
  w.SetContent(
    fyne.NewContainerWithLayout(
      layout.NewGridWrapLayout(fyne.NewSize(420, 200)),
      ui,
    ),
  )

  w.ShowAndRun()
}`} />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Keyboard Input</h2>
        <p>
          Capture keyboard input and write it to the pty master:
        </p>
        <CodeBlock code={`package main

import (
  "os"
  "os/exec"
  "time"

  "fyne.io/fyne/v2"
  "fyne.io/fyne/v2/app"
  "fyne.io/fyne/v2/layout"
  "fyne.io/fyne/v2/widget"
  "github.com/creack/pty"
)

func main() {
  a := app.New()
  w := a.NewWindow("germ")

  ui := widget.NewTextGrid()
  ui.SetText("I'm on a terminal!")

  c := exec.Command("/bin/bash")
  p, err := pty.Start(c)

  if err != nil {
    fyne.LogError("Failed to open pty", err)
    os.Exit(1)
  }

  defer c.Process.Kill()

  onTypedKey := func(e *fyne.KeyEvent) {
    if e.Name == fyne.KeyEnter || e.Name == fyne.KeyReturn {
      _, _ = p.Write([]byte{'\r'})
    }
  }

  onTypedRune := func(r rune) {
    _, _ = p.WriteString(string(r))
  }

  w.Canvas().SetOnTypedKey(onTypedKey)
  w.Canvas().SetOnTypedRune(onTypedRune)

  go func() {
    for {
      time.Sleep(1 * time.Second)
      b := make([]byte, 256)
      _, err = p.Read(b)
      if err != nil {
        fyne.LogError("Failed to read pty", err)
      }

      ui.SetText(string(b))
    }
  }()

  w.SetContent(
    fyne.NewContainerWithLayout(
      layout.NewGridWrapLayout(fyne.NewSize(420, 200)),
      ui,
    ),
  )

  w.ShowAndRun()
}`} />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Print to Screen</h2>
        <p>
          Improve screen printing by using an output buffer:
        </p>
        <CodeBlock code={`package main

import (
  "bufio"
  "io"
  "os"
  "os/exec"
  "time"

  "fyne.io/fyne/v2"
  "fyne.io/fyne/v2/app"
  "fyne.io/fyne/v2/layout"
  "fyne.io/fyne/v2/widget"
  "github.com/creack/pty"
)

const MaxBufferSize = 16

func main() {
  a := app.New()
  w := a.NewWindow("germ")

  ui := widget.NewTextGrid()

  os.Setenv("TERM", "dumb")
  c := exec.Command("/bin/bash")
  p, err := pty.Start(c)

  if err != nil {
    fyne.LogError("Failed to open pty", err)
    os.Exit(1)
  }

  defer c.Process.Kill()

  onTypedKey := func(e *fyne.KeyEvent) {
    if e.Name == fyne.KeyEnter || e.Name == fyne.KeyReturn {
      _, _ = p.Write([]byte{'\r'})
    }
  }

  onTypedRune := func(r rune) {
    _, _ = p.WriteString(string(r))
  }

  w.Canvas().SetOnTypedKey(onTypedKey)
  w.Canvas().SetOnTypedRune(onTypedRune)

  buffer := [][]rune{}
  reader := bufio.NewReader(p)

  go func() {
    line := []rune{}
    buffer = append(buffer, line)
    for {
      r, _, err := reader.ReadRune()
      if err != nil {
        if err == io.EOF {
          return
        }
        os.Exit(0)
      }
      line = append(line, r)
      buffer[len(buffer)-1] = line
      if r == '\n' {
        if len(buffer) > MaxBufferSize {
          buffer = buffer[1:]
        }
        line = []rune{}
        buffer = append(buffer, line)
      }
    }
  }()

  go func() {
    for {
      time.Sleep(100 * time.Millisecond)
      ui.SetText("")
      var lines string
      for _, line := range buffer {
        lines += string(line)
      }
      ui.SetText(string(lines))
    }
  }()

  w.SetContent(
    fyne.NewContainerWithLayout(
      layout.NewGridWrapLayout(fyne.NewSize(900, 325)),
      ui,
    ),
  )
  w.ShowAndRun()
}`} />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
        <p>
          We now have a basic terminal emulator in Go. Further enhancements could include handling ANSI escape codes, special keys, and cursor management.
        </p>
      </section>
    </div>
  );
};

export default TerminalEmulatorTutorial;
