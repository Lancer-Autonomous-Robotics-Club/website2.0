import { useEffect, useState } from 'react'

const pages = ['Home', 'About Us', 'Projects', 'Sponsor', 'Gallery', 'Contact Us']

const projects = [
    { number: '01', title: 'Autonomous Vehicle', tag: 'Ground robotics', text: 'A resilient all-terrain platform built to map, navigate, and make decisions beyond the driver station.' },
    { number: '02', title: 'Aerial Vehicle', tag: 'Perception & flight', text: 'Fast, responsive flight systems designed to sense the environment and make reliable decisions in motion.' },
    { number: '03', title: 'Aquatic Vehicle', tag: 'Underwater exploration', text: 'Compact, sensor-rich vehicles built to explore submerged environments and gather data with precision.' },
]

const gallery = [
    { label: 'Build night / 02', className: 'gallery-one' },
    { label: 'In the field / 07', className: 'gallery-two' },
    { label: 'Systems test / 11', className: 'gallery-three' },
    { label: 'Team huddle / 14', className: 'gallery-four' },
]

function Logo() {
    return <a className="logo" href="#Home" aria-label="Lancer Autonomous Robotics Club home"><img src="/LARC Logo.png" alt="LARC logo" className="logo-image" /></a>
}

function Arrow() { return <span className="arrow">↗</span> }

function App() {
    const [page, setPage] = useState(window.location.hash.slice(1) || 'Home')
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onHashChange = () => {
            setPage(window.location.hash.slice(1) || 'Home')
            window.scrollTo({ top: 0, behavior: 'smooth' })
            setMenuOpen(false)
        }
        window.addEventListener('hashchange', onHashChange)
        return () => window.removeEventListener('hashchange', onHashChange)
    }, [])

    const navigate = (nextPage) => { window.location.hash = nextPage }

    return <div className="site-shell">
        <header className="site-header">
            <Logo />
            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? 'Close' : 'Menu'} <span>☰</span></button>
            <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
                {pages.map(item => <a key={item} className={page === item ? 'active' : ''} href={`#${item}`}>{item}</a>)}
            </nav>
        </header>
        <main>
            {page === 'Home' && <Home navigate={navigate} />}
            {page === 'About Us' && <About navigate={navigate} />}
            {page === 'Projects' && <Projects navigate={navigate} />}
            {page === 'Sponsor' && <Sponsor navigate={navigate} />}
            {page === 'Gallery' && <Gallery navigate={navigate} />}
            {page === 'Contact Us' && <Contact />}
            {page === 'Ground robotics' && <UnderConstruction title="Ground Robotics" />}
            {page === 'Aerial Vehicle' && <UnderConstruction title="Aerial Vehicle" />}
            {page === 'Aquatic Vehicle' && <UnderConstruction title="Aquatic Vehicle" />}
        </main>
        <footer className="site-footer"><Logo /><p>Built at the University of Windsor.<br />Driven by curiosity.</p><span>© 2026 LARC</span></footer>
    </div>
}

function PageIntro({ eyebrow, title, copy }) {
    return <section className="page-intro section-pad"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1>{copy && <p>{copy}</p>}</section>
}

function Home({ navigate }) {
    return <>
        <section className="hero section-pad">
            <div className="hero-copy">
                <img src="/LARC Logo.png" alt="LARC logo" className="hero-logo" />
                <h1>Lancer Autonomous Robotics Club</h1>
                <p className="hero-subtext">Build the Future</p>
            </div>
        </section>
        <section className="club-intro section-pad">
            <div className="club-intro-layout">
                <div className="club-intro-copy">
                    <div className="eyebrow">LARC</div>
                    <h2>Founded in 2026, the Lancer Autonomous Robotics Club is the innovative robotics student led group at the University of Windsor.</h2>
                </div>
                <div className="club-intro-image" aria-label="Image placeholder"></div>
            </div>
        </section>
        <section className="project-preview section-pad"><div className="section-heading"><div><div className="eyebrow">Meet the teams</div><h2>LARC subteams</h2></div><a className="text-link" href="#Projects">All projects <Arrow /></a></div><div className="project-grid">{projects.map(project => <article className="project-card" key={project.number} onClick={() => navigate(project.title)}><span className="project-number">{project.number}</span><div><span className="project-tag">{project.tag}</span><h3>{project.title}</h3><p>{project.text}</p></div><Arrow /></article>)}</div></section>
    </>
}

function About({ navigate }) {
    return <><PageIntro eyebrow="About the club" title={<>People first.<br /><em>Purpose always.</em></>} copy="We are a multidisciplinary student team at the University of Windsor, united by a belief that the most interesting problems are solved together." /><section className="about-content section-pad"><div className="about-photo photo-field"><span>Team / Windsor, ON</span></div><div className="about-story"><div className="eyebrow">Our approach</div><h2>Learn loudly.<br />Build boldly.</h2><p>LARC is a place to try, fail, share, and try again. Our members work across mechanical design, electrical systems, software, business, and everything in between.</p><p>We compete, but our real measure of success is the person who leaves with more confidence than when they arrived.</p><a className="button button-dark" href="#Contact Us">Meet us in the lab <Arrow /></a></div></section><section className="stats section-pad"><div><strong>04</strong><span>Core disciplines</span></div><div><strong>35+</strong><span>Active members</span></div><div><strong>∞</strong><span>Questions asked</span></div></section></>
}

function TeamDetail({ title, subtitle, text }) {
    return <section className="page-intro section-pad"><div className="eyebrow">{subtitle || 'Team'}</div><h1>{title}</h1>{text && <p>{text}</p>}<a className="button button-dark" href="#Projects">Back to projects <Arrow /></a></section>
}

function UnderConstruction({ title }) {
    return <section className="page-intro section-pad"><div className="eyebrow">Coming soon</div><h1>{title}</h1><p>Under construction.</p><a className="button button-dark" href="#Projects">Back to projects <Arrow /></a></section>
}

function Projects({ navigate }) { return <><PageIntro eyebrow="What we make" title={<>Ideas with<br /><em>momentum.</em></>} copy="From the first sketch to the final field test, every project is a chance to make the invisible feel possible." /><section className="projects-list section-pad">{projects.map((project, index) => <article className={`project-row row-${index + 1}`} key={project.number}><div className="row-art"><span>{project.number}</span><div className="mini-orbit"></div></div><div className="row-copy"><span className="project-tag">{project.tag}</span><h2>{project.title}</h2><p>{project.text}</p><a className="text-link" href={`#${project.title}`}>Explore team <Arrow /></a></div></article>)}</section><section className="dark-band section-pad"><div className="eyebrow">Want to build with us?</div><h2>The next system<br /><em>starts with a question.</em></h2><a className="button button-orange" href="#Contact Us">Get in touch <Arrow /></a></section></> }

function Sponsor({ navigate }) { return <><PageIntro eyebrow="Power the possible" title={<>Back the<br /><em>breakthrough.</em></>} copy="The right partnership does more than put a logo on a banner. It gives students the tools, trust, and runway to build work that matters." /><section className="sponsor-layout section-pad"><div className="sponsor-copy"><div className="eyebrow">Why partner with LARC</div><h2>Invest in the<br />next generation<br /><em>of makers.</em></h2><p>Your support fuels materials, competition travel, technical workshops, and the kind of hands-on learning that stays with students long after graduation.</p><a className="button button-dark" href="#Contact Us">Become a sponsor <Arrow /></a></div><div className="sponsor-tiers"><div><span>01</span><h3>Partner</h3><p>Support a project and help us get from prototype to proof.</p></div><div><span>02</span><h3>Collaborator</h3><p>Share your expertise, facilities, or a problem worth solving.</p></div><div><span>03</span><h3>Launch partner</h3><p>Make a lasting investment in the future of robotics at Windsor.</p></div></div></section></> }

function Gallery({ navigate }) { return <><PageIntro eyebrow="The archive" title={<>A lot can happen<br /><em>in the lab.</em></>} copy="A living record of late nights, first tests, small wins, and the people who make it all worthwhile." /><section className="gallery-grid section-pad">{gallery.map(item => <figure className={`gallery-item ${item.className}`} key={item.label}><div className="gallery-image"><span>✦</span></div><figcaption>{item.label}</figcaption></figure>)}</section></> }

function Contact() { return <><PageIntro eyebrow="Come say hello" title={<>Let's make<br /><em>something move.</em></>} copy="Whether you want to join, collaborate, sponsor, or simply ask a very specific robotics question, our inbox is open." /><section className="contact-layout section-pad"><div><div className="eyebrow">Find us</div><h2>University of Windsor<br />Essex Hall · Room 312</h2><p>Windsor, Ontario<br />Canada N9B 3P4</p><a className="text-link" href="mailto:lancerrobotics@uwindsor.ca">lancerrobotics@uwindsor.ca <Arrow /></a></div><form onSubmit={event => event.preventDefault()}><label>Name<input type="text" placeholder="Your name" /></label><label>Email<input type="email" placeholder="you@email.com" /></label><label>Message<textarea rows="4" placeholder="Tell us what you are thinking about..."></textarea></label><button className="button button-orange" type="submit">Send a note <Arrow /></button></form></section></> }

export default App
