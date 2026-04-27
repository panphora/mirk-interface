import { useEffect, useState } from "react";
import {
  TextInput,
  Textarea,
  Dropdown,
  RadioGroup,
  Checkbox,
  Button,
  FileUpload,
} from "./components/ui-kit";

export default function App() {
  const [dark, setDark] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState("");
  const [plan, setPlan] = useState("standard");
  const [news, setNews] = useState(true);
  const [terms, setTerms] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <header className="border-[2px] border-foreground mb-10">
          <div className="flex items-center justify-between border-b-[2px] border-foreground px-4 py-2 bg-foreground text-background uppercase tracking-wider text-[16px]">
            <span>BLOCK/UI ::: v1.0.0</span>
            <span className="hidden sm:inline">SYS://FORMS</span>
          </div>
          <div className="flex items-end justify-between p-6 gap-4">
            <div>
              <h1
                className="font-pixel text-[28px] leading-tight m-0 uppercase"
                style={{ letterSpacing: "0.02em" }}
              >
                BLOCK/UI
              </h1>
              <p className="text-[18px] mt-3 text-foreground caret-blink">
                &gt; A high-contrast 8-bit form kit. Insert coin to begin
              </p>
            </div>
            <button
              type="button"
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle theme"
              className="inline-flex items-center gap-2 border-[2px] border-foreground px-4 py-2 text-[18px] bg-background hover:bg-accent uppercase tracking-wide focus-visible:[outline:1px_solid_var(--foreground)] focus-visible:[outline-offset:1px]"
            >
              [{dark ? "☀ LIGHT" : "☾ DARK"}]
            </button>
          </div>
        </header>

        <Section title="01 — TEXT INPUT">
          <TextInput
            label="Player name"
            placeholder="ADA_LOVELACE"
            value={name}
            onChange={(e) => setName(e.target.value)}
            hint="Letters, numbers, underscores."
          />
          <TextInput
            label="Email"
            type="email"
            placeholder="you@domain.com"
            error="Invalid email address."
          />
        </Section>

        <Section title="02 — TEXTAREA">
          <Textarea
            label="Short bio"
            placeholder="Tell us about yourself…"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            hint="A couple of sentences is plenty."
          />
        </Section>

        <Section title="03 — DROPDOWN">
          <Dropdown
            label="Region"
            placeholder="-- SELECT REGION --"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            options={[
              { value: "us", label: "United States" },
              { value: "ca", label: "Canada" },
              { value: "mx", label: "Mexico" },
              { value: "uk", label: "United Kingdom" },
              { value: "de", label: "Germany" },
              { value: "jp", label: "Japan" },
            ]}
          />
        </Section>

        <Section title="04 — RADIO">
          <RadioGroup
            label="Choose a plan"
            name="plan"
            value={plan}
            onChange={setPlan}
            options={[
              { value: "basic", label: "BASIC — free forever" },
              { value: "standard", label: "STANDARD — $9 / month" },
              { value: "pro", label: "PRO — $29 / month" },
            ]}
          />
        </Section>

        <Section title="05 — CHECKBOX">
          <div className="flex flex-col gap-3">
            <Checkbox
              label="Send me product updates"
              checked={news}
              onChange={(e) => setNews(e.target.checked)}
            />
            <Checkbox
              label="I agree to the terms and conditions"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
            />
            <Checkbox label="Disabled option" disabled />
          </div>
        </Section>

        <Section title="06 — BUTTONS">
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary">Continue ▶</Button>
            <Button variant="secondary">Save draft</Button>
            <Button variant="tertiary">Cancel</Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
        </Section>

        <Section title="07 — FILE UPLOAD">
          <FileUpload
            label="Profile picture"
            buttonText="Upload image"
            accept="image/*"
            hint="PNG or JPG, up to 5 MB."
          />
          <FileUpload
            label="Attachments"
            buttonText="Choose files"
            multiple
            hint="You can select multiple files."
          />
        </Section>

        <footer className="border-t-[2px] border-foreground pt-6 mt-12 text-[16px] uppercase tracking-wider flex items-center justify-between">
          <span>:: END OF TRANSMISSION ::</span>
          <span className="caret-blink">PRESS ANY KEY</span>
        </footer>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="font-pixel text-[16px] leading-tight mb-6 inline-block border-b-[2px] border-foreground pb-2 uppercase">
        {title}
      </h2>
      <div className="flex flex-col gap-6">{children}</div>
    </section>
  );
}
