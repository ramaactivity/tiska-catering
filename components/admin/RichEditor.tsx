"use client";

import { useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

/** Ubah konten awal (HTML atau teks lama dgn baris kosong) jadi HTML. */
function toInitialHTML(value: string): string {
  const v = value?.trim() ?? "";
  if (!v) return "";
  if (/<[a-z][\s\S]*>/i.test(v)) return v; // sudah HTML
  return v
    .split(/\n{2,}/)
    .map((p) => `<p>${p.replace(/\n/g, "<br>").trim()}</p>`)
    .join("");
}

/** Editor teks kaya (Tiptap) untuk isi kabar — output HTML ke input tersembunyi. */
export default function RichEditor({
  name,
  defaultValue = "",
  placeholder = "Tulis cerita selengkapnya…",
}: {
  name: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  const initial = toInitialHTML(defaultValue);
  const [html, setHtml] = useState(initial);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: { openOnClick: false, HTMLAttributes: { rel: "noopener" } },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: initial,
    editorProps: {
      attributes: { class: "admin-editor kabar-prose text-[15px] text-ad-text" },
    },
    onUpdate: ({ editor }) => {
      const out = editor.getText().trim() ? editor.getHTML() : "";
      setHtml(out);
    },
  });

  return (
    <div className="overflow-hidden rounded-xl border border-ad-border bg-ad-input shadow-[0_1px_2px_var(--ad-shadow)] focus-within:border-ad-accent focus-within:shadow-[0_0_0_3px_var(--ad-accent-weak)]">
      <Toolbar editor={editor} />
      <div className="px-4 py-3" onClick={() => editor?.chain().focus().run()}>
        <EditorContent editor={editor} />
      </div>
      <input type="hidden" name={name} value={html} />
    </div>
  );
}

function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return (
      <div className="h-[42px] border-b border-ad-border bg-ad-panel-2" />
    );
  }

  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Tautkan ke (URL):", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-ad-border bg-ad-panel-2 px-2 py-1.5">
      <Btn on={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} label="Tebal">
        <b>B</b>
      </Btn>
      <Btn on={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} label="Miring">
        <i>i</i>
      </Btn>
      <Sep />
      <Btn on={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} label="Judul">
        H2
      </Btn>
      <Btn on={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} label="Subjudul">
        H3
      </Btn>
      <Sep />
      <Btn on={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()} label="Daftar">
        •
      </Btn>
      <Btn on={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()} label="Daftar nomor">
        1.
      </Btn>
      <Btn on={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()} label="Kutipan">
        ❝
      </Btn>
      <Btn on={editor.isActive("link")} onClick={setLink} label="Tautan">
        🔗
      </Btn>
      <Sep />
      <Btn on={false} onClick={() => editor.chain().focus().undo().run()} label="Urungkan">
        ↺
      </Btn>
      <Btn on={false} onClick={() => editor.chain().focus().redo().run()} label="Ulangi">
        ↻
      </Btn>
    </div>
  );
}

function Btn({
  on,
  onClick,
  label,
  children,
}: {
  on: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      aria-pressed={on}
      className={`flex h-7 min-w-7 items-center justify-center rounded-md px-1.5 text-[13px] transition-colors ${
        on
          ? "bg-[var(--ad-accent-weak)] text-ad-accent"
          : "text-ad-muted hover:bg-ad-bg hover:text-ad-text"
      }`}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <span aria-hidden className="mx-1 h-4 w-px bg-ad-border" />;
}
