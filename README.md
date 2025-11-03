## Enterprise Delivery Blueprint Planner

A security-first planning workbench used by our internal strategy teams to transform raw client briefs into executive-grade Agile/Scrum delivery blueprints. The app captures client goals, compliance constraints, and security priorities, then produces a structured program plan covering architecture, governance, sprint cadence, and success metrics.

### Key Capabilities

- Interactive brief builder tailored to Fortune/Forbes-class engagements.
- Automated generation of target architecture, security posture, backlog highlights, and sprint roadmap.
- Embedded quality, risk, and governance guidance aligned to enterprise expectations.
- Vercel-ready Next.js 14 app using the App Router, Tailwind CSS, and modern React patterns.

### Local Development

```bash
npm install
npm run dev
```

Navigate to `http://localhost:3000` and begin customizing the client brief to generate a new program blueprint.

### Production Build

```bash
npm run build
npm run start
```

### Deployment

The project is optimized for Vercel. Deploy with:

```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-ae0a04d7
```

After deployment, verify availability:

```bash
curl https://agentic-ae0a04d7.vercel.app
```
