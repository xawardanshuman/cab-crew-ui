'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Header Navigation */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>🚖</div>
          <span>Cab Crew</span>
        </div>
        <nav className={styles.nav}>
          <a href="#home" className={styles.navActive}>Home</a>
          <a href="#product">Product</a>
          <a href="#contact">Contact</a>
          <a href="#about">About</a>
        </nav>
        <div className={styles.authButtons}>
          <Link href="/admin/login" className={styles.signIn}>Sign In</Link>
          <Link href="/booking" className={styles.register}>Register</Link>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.leftSection}>
          <div className={styles.heroText}>
            <h1>
              GET YOUR<br />
              <span className={styles.highlight}>DREAM CAR</span>
            </h1>
            <p className={styles.description}>
              Book your perfect ride in Pune with transparent pricing and instant confirmation. 
              Choose from our fleet of well-maintained vehicles for a comfortable journey.
            </p>
            <button className={styles.discoverBtn}>
              <Link href="/booking">Discover</Link>
            </button>
          </div>

          {/* Car Image */}
          <div className={styles.carImageSection}>
            <img 
              src="https://nyc3.digitaloceanspaces.com/bhindi-drive/files/c81de6ac-fc8d-4726-ba11-69bf703214b2/2025-11-30T08-26-09-930Z-efaca164-chat-image-1764491169912-0.jpeg.jpg" 
              alt="SUV Car" 
              className={styles.carImage}
            />
            <div className={styles.carLabel}>SUV LOREM</div>
          </div>

          {/* Specifications */}
          <div className={styles.specifications}>
            <div className={styles.specColumn}>
              <h3>PERFORMANCE</h3>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Top Speed</span>
                <span className={styles.specValue}>180 Km/h</span>
                <span className={styles.specSubValue}>0-100 Km/h 8.0 Sec</span>
              </div>
            </div>
            <div className={styles.specColumn}>
              <h3>SPECIFICATION</h3>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Petrol</span>
                <span className={styles.specValue}>1:15 /L</span>
              </div>
            </div>
            <div className={styles.specColumn}>
              <h3>INTERIOR</h3>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Power</span>
                <span className={styles.specValue}>2,000 CC</span>
                <span className={styles.specSubValue}>116 Hp</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Car Sale Search */}
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>CAR SALE</h2>
          <div className={styles.searchFilters}>
            <div className={styles.filterItem}>
              <span>LOREM IPSUM</span>
              <button className={styles.filterBtn}>+</button>
            </div>
            <div className={styles.filterItem}>
              <span>LOREM IPSUM</span>
              <button className={styles.filterBtn}>+</button>
            </div>
            <div className={styles.filterItem}>
              <span>LOREM IPSUM</span>
              <button className={styles.filterBtn}>+</button>
            </div>
            <div className={styles.filterItem}>
              <span>LOREM IPSUM</span>
              <span className={styles.price}>$6,000</span>
            </div>
          </div>
          <button className={styles.searchBtn}>
            <Link href="/booking">Search</Link>
          </button>
        </aside>
      </main>

      {/* Floating Action Buttons */}
      <div className={styles.floatingActions}>
        <button className={styles.actionBtn}>👤</button>
        <button className={styles.actionBtn}>⚙️</button>
        <button className={styles.actionBtn}>📤</button>
      </div>
    </div>
  );
}