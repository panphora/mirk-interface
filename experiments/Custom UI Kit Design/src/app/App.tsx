import { useEffect, useState } from "react";
import { Sun, Moon, ArrowRight } from "lucide-react";
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
        <header className="flex items-end justify-between border-b-[2px] border-foreground pb-6 mb-10">
          <div>
            <h1 className="text-[40px] leading-none m-0" style={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
              BLOCK/UI
            </h1>
            <p className="text-[18px] mt-3 text-foreground" style={{ fontWeight: 500 }}>
              A bold, high-contrast form kit. Sharp edges. 2px borders.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle theme"
            className="inline-flex items-center gap-2 border-[2px] border-foreground px-4 py-2 text-[18px] bg-background hover:bg-accent"
            style={{ fontWeight: 700 }}
          >
            {dark ? <Sun size={20} strokeWidth={2.5} /> : <Moon size={20} strokeWidth={2.5} />}
            {dark ? "Light" : "Dark"}
          </button>
        </header>

        <Section title="01 — Text Input">
          <TextInput
            label="Full name"
            placeholder="Ada Lovelace"
            value={name}
            onChange={(e) => setName(e.target.value)}
            hint="As it appears on your ID."
          />
          <TextInput
            label="Email"
            type="email"
            placeholder="you@domain.com"
            error="Please enter a valid email address."
          />
        </Section>

        <Section title="02 — Textarea">
          <Textarea
            label="Short bio"
            placeholder="Tell us about yourself…"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            hint="A couple of sentences is plenty."
          />
        </Section>

        <Section title="03 — Dropdown">
          <Dropdown
            label="Country"
            placeholder="Select a country"
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

        <Section title="04 — Radio">
          <RadioGroup
            label="Choose a plan"
            name="plan"
            value={plan}
            onChange={setPlan}
            options={[
              { value: "basic", label: "Basic — free forever" },
              { value: "standard", label: "Standard — $9 / month" },
              { value: "pro", label: "Pro — $29 / month" },
            ]}
          />
        </Section>

        <Section title="05 — Checkbox">
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

        <Section title="06 — Buttons">
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary">
              Continue <ArrowRight size={20} strokeWidth={2.5} />
            </Button>
            <Button variant="secondary">Save draft</Button>
            <Button variant="tertiary">Cancel</Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
        </Section>

        <Section title="07 — File Upload">
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

        <footer className="border-t-[2px] border-foreground pt-6 mt-12 text-[16px]" style={{ fontWeight: 500 }}>
          BLOCK/UI · Built for clarity, contrast, and confidence.
        </footer>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-[22px] leading-tight mb-5 inline-block border-b-[2px] border-foreground pb-1" style={{ fontWeight: 800, letterSpacing: "-0.01em" }}>
        {title}
      </h2>
      <div className="flex flex-col gap-6">{children}</div>
    </section>
  );
}
