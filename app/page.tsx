import Mermaid from "./components/Mermaid";
import Typed from "./components/Typed";

const profile = {
  name: "Arthur Malfere",
  role: "Backend Developer",
  org: "Nicomatic",
  city: "Cluses, FR",
  since: "Sept. 2025",
  status: "open to interesting collaborations",
  email: "arthur@malfere.dev",
  github: "github.com/malfere",
  linkedin: "linkedin.com/in/arthur-malfere",
  pgp: "F1A9 4B72 90CE 8E21  1101 7F03",
};

const stack = [
  { layer: "Langs", items: "Go, TypeScript, Python, Bash, SQL" },
  { layer: "Data", items: "PostgreSQL, Redis, SQLite, OpenSearch" },
  { layer: "Infra", items: "Docker, Traefik, Ansible, Debian, Nginx" },
  { layer: "WWW", items: "Echo, chi, HTMX, Templ, Svelte" },
  { layer: "Obs.", items: "Prometheus, Grafana, Loki, OTel" },
  { layer: "Tools", items: "neovim, git, make, just, age" },
];

const skills: Array<{ name: string; level: number; note: string }> = [
  { name: "Go", level: 9, note: "daily" },
  { name: "PostgreSQL", level: 8, note: "daily" },
  { name: "Bash", level: 9, note: "daily" },
  { name: "TypeScript", level: 7, note: "weekly" },
  { name: "Python", level: 7, note: "weekly" },
  { name: "Linux", level: 9, note: "daily" },
  { name: "Docker", level: 7, note: "weekly" },
  { name: "Ansible", level: 6, note: "weekly" },
  { name: "HTMX", level: 5, note: "monthly" },
  { name: "Svelte", level: 4, note: "monthly" },
];

const projects = [
  {
    id: "01",
    name: "hfetch",
    tagline: "curl, but in Haskell",
    stack: "Haskell · optparse-applicative · bytestring · http-client-tls",
    role: "Author",
    year: "since 2024",
    summary:
      "From-scratch re-implementation of the parts of curl I actually use: HTTP/HTTPS GET and POST, custom headers, basic auth, file uploads, redirect follow, compressed bodies. No cache, no cookies, no FTP — just the boring 80% that fits in ~1.5 KLOC and a single static binary. Mostly an excuse to learn Haskell's lazy-bytestring-plus-strict-IO discipline in anger.",
    art: `flowchart LR
      Argv[argv :: String] --> Parse[optparse-applicative]
      Parse --> URL[URI parser]
      URL --> Resolv[resolver / TCP connect]
      Resolv --> TLS[tls-session<br/>ALPN · SNI]
      TLS --> Req[build Request]
      Req --> Send[sendAll]
      Send --> Recv[receive incremental]
      Recv --> Status{2xx?}
      Status -- yes --> Body[stream body to stdout / file]
      Status -- no  --> Err[exit per HTTP status]`,
    link: "https://github.com/malfere/hfetch",
  },
  {
    id: "02",
    name: "nrftp",
    tagline: "nearby rapid file transfer protocol",
    stack: "Go · mDNS · quic-go · bubbletea TUI",
    role: "Author",
    year: "since 2025",
    summary:
      "Send a 12 GB directory to the colleague in the next chair without touching a cloud and without uploading to anyone. mDNS announces `nrftp._tcp.local` peers; the receiver invites, we negotiate block size and a BLAKE3 rolling hash, then the file streams over QUIC with per-block resume and integrity. No accounts, no daemon, no web UI — a CLI with a small bubbletea progress TUI.",
    art: `sequenceDiagram
      autonumber
      participant Src as Sender
      participant LAN as LAN mDNS
      participant Dst as Receiver
      Src->>LAN: nrftp._tcp.local announce
      Dst->>LAN: browse nrftp._tcp.local
      LAN-->>Dst: peers
      Dst->>Src: INVITE - manifest, block size
      Src-->>Dst: OK or REJECT
      loop blocks 0..N
        Dst->>Src: GET block N
        Src-->>Dst: QUIC stream - 8 MiB - BLAKE3
      end
      Src->>Dst: COMMIT - rolling hash
      Dst-->>Src: ACK - retry block`,
    link: "https://github.com/malfere/nrftp",
  },
  {
    id: "03",
    name: "srrdb",
    tagline: "MySQL-flavoured RDBMS, in Rust",
    stack: "Rust · nom · sqlparser-rs · custom B+Tree · WAL",
    role: "Author",
    year: "since 2024",
    summary:
      "A weekend study in database engines: a wire-compatible-ish MySQL server in Rust. SQL parser → logical planner → cost-based iterator executor → paged storage on top of a B+Tree. ACID via WAL + MVCC read snapshots, single-writer / multi-reader. No query cache, no replication, no JSON — only the parts of MySQL I find genuinely interesting.",
    art: `flowchart TB
      Client[mysql-cli] --> Wire[wire protocol<br/>MySQL 5.7 dialect]
      Wire --> Lex[lexer / nom]
      Lex --> Parse[parser / sqlparser-rs]
      Parse --> Plan[logical planner]
      Plan --> Opt[cost-based optimizer<br/>stats from ANALYZE]
      Opt --> Exec[volcano iterator executor]
      Exec --> MVCC[MVCC<br/>read snapshots<br/>WAL append]
      MVCC --> BTree[B+Tree storage<br/>16 KB pages]
      BTree --> Disk[(on-disk files)]`,
    link: "https://github.com/malfere/srrdb",
  },
];

const experience = [
  {
    since: "2025 · now",
    where: "Nicomatic",
    city: "Cluses, FR",
    role: "Backend Developer",
    detail:
      "Designing and shipping the internal services that connect design, sales and manufacturing at a French connector company: catalog APIs, production tracing tools, automated QC pipelines. Mostly Go and PostgreSQL, with the occasional Svelte/HTMX front panel strapped on top.",
  },
  {
    since: "2024 · 2025",
    where: "CSB · Cybersecurity school",
    city: "Lyon, FR",
    role: "Cybersecurity apprentice",
    detail:
      "Hands-on year of blue-team training: SOC tooling, log analysis and IOC triage on Splunk/Wazuh, network forensics, OWASP top-10 web audits, a fair amount of CTFs. Hardened Linux and Windows hosts, walked through incident response playbooks, wrote a few detection-as-code rules in Sigma.",
  },
  {
    since: "2022 · 2024",
    where: "IUT Lyon 2 + Piscine 42",
    city: "Lyon, FR",
    role: "DUT Science des Données · C pupil at 42",
    detail:
      "Two-year university diploma in data science (Python, R, SQL, statistics, supervised/unsupervised learning, basic ML pipelines). In parallel, the Piscine 42 — a month-long C/Unix bootcamp with peer-review only: no teachers, no grades, just relentless code review and the realisation that real programmers read code more than they write it.",
  },
];

const reading = [
  "Database Internals — Alex Petrov",
  "Crafting Interpreters — Robert Nystrom",
  "The Mythical Man-Month — Fred Brooks",
  "Refactoring — Martin Fowler (2nd ed.)",
];

const focus = [
  "Designing resilient async pipelines in Go",
  "Replacing legacy Perl reporting with HTMX+SQL",
  "Stable Q1 patterns for inter-service tracing",
  "A weekend project in TinyGo + e-ink",
];

function Bar({ level = 10 }: { level: number }) {
  const cells = Array.from({ length: 10 }, (_, i) => i < level);
  return (
    <span className="bar-row" aria-label={`level ${level} of 10`}>
      {cells.map((on, i) => (
        <span key={i} data-empty={on ? 0 : 1} />
      ))}
    </span>
  );
}

export default function Page() {
  return (
    <>
      <header>
        <table className="header">
          <tbody>
            <tr>
              <td className="width-auto" colSpan={2} rowSpan={2}>
                <h1 className="title">{profile.name}</h1>
                <span className="subtitle dim">
                  {profile.role.toLowerCase()} · {profile.org.toLowerCase()} ·{" "}
                  {profile.city.toLowerCase()}
                </span>
              </td>
              <th>Version</th>
              <td className="width-min">v1.0.0</td>
            </tr>
            <tr>
              <th>Updated</th>
              <td className="width-min">
                <time>2026-09-16</time>
              </td>
            </tr>
            <tr>
              <th>Status</th>
              <td className="width-auto">
                <span className="status-dot" /> {profile.status}
              </td>
              <th>Since</th>
              <td>{profile.since}</td>
            </tr>
          </tbody>
        </table>

        <p
          style={{
            margin: "calc(var(--line-height) * 2) 0 var(--line-height)",
          }}
        >
          <Typed
            lines={[
              "$ whoami — arthur.malfere",
              "$ cat role.txt → backend @ nicomatic",
              "$ uptime — 4.2y · open_to_collab=true",
              "$ echo — write_to_me() // malfere.dev",
            ]}
          />
        </p>

        <nav aria-label="Sections">
          <p style={{ marginBottom: 0 }}>
            <a href="#about">[01] about</a>{"  ·  "}
            <a href="#now">[02] now</a>{"  ·  "}
            <a href="#stack">[03] stack</a>{"  ·  "}
            <a href="#play">[04] play</a>{"  ·  "}
            <a href="#log">[05] log</a>{"  ·  "}
            <a href="#talk">[06] talk</a>
          </p>
        </nav>
      </header>

      <hr />

      <section>
        <h2 id="about">[01] About</h2>
        <p>
          Je suis <strong>{profile.name}</strong>, développeur backend à{" "}
          <a
            href="https://www.nicomatic.com/fr"
            className="link"
            rel="noreferrer"
          >
            Nicomatic
          </a>
          , une PME française qui conçoit des connecteurs et solutions
          d&apos;interconnexion pour l&apos;aérospatial, la défense et le
          médical. Quand je ne pousse pas des migrations SQL, j&apos;aime
          écrire des outils en ligne de commande, lire des schémas Mermaid et
          bricoler de petits services en weekend.
        </p>

        <p>
          Je préfère les diagrammes qui passent dans un commit, les commits
          courts, les architectures boring-but-correct, et le café filtre.
        </p>

        <Mermaid
          caption="A typical day of plumbing, last week."
          chart={`flowchart LR
    A[HTTP] --> B[parse / validate]
    C[CLI]  --> B
    B --> D[PG.WAL ingest]
    D --> E[PG.HOT trx]
    E --> F[PG.COLD weekly]
    F --> G[aggregate / export]
    F --> P[Prometheus]
    F --> R[Grafana]`}
        />
      </section>

      <section>
        <h2 id="now">[02] Now</h2>
        <p>
          <span className="tag">2026-09</span> writing a thin trace CLI on top
          of the production MES, listening to <em>Idles</em>, and starting to
          prototype a small Svelte+Htmx feedback panel for sales engineers.
        </p>

        <p>
          <span className="tag">focus</span>
        </p>
        <ul>
          {focus.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>

        <p>
          <span className="tag">reading</span>
        </p>
        <ul>
          {reading.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 id="stack">[03] Stack</h2>
        <table>
          <thead>
            <tr>
              <th className="width-min">Layer</th>
              <th className="width-auto">Tools</th>
            </tr>
          </thead>
          <tbody>
            {stack.map((row) => (
              <tr key={row.layer}>
                <td>{row.layer}</td>
                <td>{row.items}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ marginTop: "calc(var(--line-height) * 2)" }}>
          Self-rated competency, 1-10:
        </p>
        <table>
          <thead>
            <tr>
              <th className="width-min">Skill</th>
              <th className="width-auto">Level</th>
              <th className="width-min">Score</th>
              <th className="width-min">Use</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((s) => (
              <tr key={s.name}>
                <td>{s.name}</td>
                <td>
                  <Bar level={s.level} />
                </td>
                <td>
                  {s.level} <span className="dim">/ 10</span>
                </td>
                <td className="dim">{s.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 id="play">[04] Play</h2>
        <p className="dim">
          Three open-source projects I keep returning to. All built on a small
          Debian box under my desk, all on GitHub.
        </p>

        {projects.map((p) => (
          <article key={p.id} style={{ marginTop: "calc(var(--line-height) * 2)" }}>
            <h3 style={{ marginBottom: 0 }}>
              <span className="dim">{p.id} · </span>
              {p.name}
              {p.tagline ? (
                <>
                  {" — "}
                  <em className="dim">{p.tagline}</em>
                </>
              ) : null}
              {" "}
              <span className="dim tag" style={{ marginLeft: "1ch" }}>
                {p.stack}
              </span>
            </h3>
            <p style={{ marginTop: 0 }}>{p.summary}</p>
            <Mermaid
              chart={p.art}
              caption={p.link ? undefined : "not open-source · internal tool"}
            />
            {p.link ? (
              <p style={{ marginTop: 0, fontStyle: "italic" }}>
                <a href={p.link} className="link" rel="noreferrer">
                  {p.link}
                </a>
              </p>
            ) : null}
          </article>
        ))}
      </section>

      <section>
        <h2 id="log">[05] Log</h2>
        <table>
          <thead>
            <tr>
              <th className="width-min">Since</th>
              <th className="width-auto">Where</th>
              <th className="width-min">Role</th>
            </tr>
          </thead>
          <tbody>
            {experience.map((e) => (
              <tr key={`${e.since}-${e.where}`}>
                <td>{e.since}</td>
                <td>
                  {e.where} <span className="dim">· {e.city}</span>
                </td>
                <td>{e.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ul style={{ marginTop: "calc(var(--line-height) * 2)" }}>
          {experience.map((e) => (
            <li key={`${e.since}-${e.where}-d`}>
              <strong>{e.role}</strong> at <em>{e.where}</em> — {e.detail}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 id="talk">[06] Talk</h2>
        <p>
          Le moyen le plus simple de me joindre reste l&apos;email. Je réponds
          en général sous 48h, sauf si je suis dans un timing d&apos;usinage.
        </p>
        <ul className="tree" style={{ marginTop: 0 }}>
          <li>
            <span className="dim">contact/</span>
            <ul>
              <li>
                <span className="dim">email</span> ·{" "}
                <a className="link" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </li>
              <li>
                <span className="dim">git</span> ·{" "}
                <a
                  className="link"
                  href={`https://${profile.github}`}
                  rel="noreferrer"
                >
                  {profile.github}
                </a>
              </li>
              <li>
                <span className="dim">in</span> ·{" "}
                <a
                  className="link"
                  href={`https://${profile.linkedin}`}
                  rel="noreferrer"
                >
                  {profile.linkedin}
                </a>
              </li>
              <li>
                <span className="dim">pgp</span> ·{" "}
                <code>{profile.pgp}</code>
              </li>
            </ul>
          </li>
        </ul>

        <form
          className="grid"
          style={{ marginTop: "calc(var(--line-height) * 2)" }}
          aria-label="Quick contact"
        >
          <label>
            name
            <input type="text" placeholder="… your name" />
          </label>
          <label>
            email
            <input type="text" placeholder="… your email" />
          </label>
          <label>
            subject
            <input type="text" placeholder="… backend collab / freelance / …" />
          </label>
          <label>
            message
            <input type="text" placeholder="… a few lines about your project" />
          </label>
        </form>

        <p className="dim" style={{ marginTop: "calc(var(--line-height) * 2)" }}>
          Press <span className="kbd">Tab</span> to move between fields. Press{" "}
          <span className="kbd">⌘</span>
          <span className="kbd">↵</span> to send.
        </p>
      </section>

      <hr />

      <footer>
        <p className="dim" style={{ marginBottom: 0 }}>
          © {new Date().getFullYear()} {profile.name}. Built with{" "}
          <a
            href="https://owickstrom.github.io/the-monospace-web/"
            className="link"
            rel="noreferrer"
          >
            the-monospace-web
          </a>
          , Next.js, and the JetBrains Mono grid. Hand-drawn diagrams, all
          rights reserved to the typist.
        </p>
      </footer>
    </>
  );
}
