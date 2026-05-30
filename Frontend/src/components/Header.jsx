import React from "react";

const PosterHeader = () => {
  const styles = {
    header: "w-full border-b-[8px] border-[#d98064] shadow-2xl",
    topSection: "w-full flex flex-col items-center py-6 bg-[#212529]",
    icon: "h-16 w-16 text-[#d98064] mb-2",

    // Title Styles
    titleSection:
      "w-full px-4 py-8 text-center bg-[#212529] border-t border-gray-800",
    mainTitle:
      "text-white font-serif font-black uppercase tracking-tighter !m-0",
    mainTitleFontSize: { fontSize: "clamp(2.5rem, 8vw, 6rem)" },
    subTitle:
      "text-[#d98064] font-bold mt-2 tracking-[0.3em] uppercase text-lg md:text-2xl",

    // Info Bar (Team ID & Coordinator)
    infoBar:
      "w-full bg-[#d98064] py-2 px-8 flex justify-between items-center text-[#212529] font-bold text-sm md:text-base tracking-widest",

    // Bottom Details Section
    detailsSection:
      "w-full bg-[#1a1d21] p-8 md:p-10 border-t-2 border-[#d98064]",
    grid: "max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10",

    label: "text-gray-400 text-xs uppercase tracking-[0.2em] mb-3 font-bold",
    memberName: "text-white font-bold text-lg md:text-xl",
    memberId: "text-[#d98064] font-mono ml-2 text-sm",

    supervisorName: "text-white text-2xl md:text-3xl font-black",
    supervisorTitle:
      "text-[#d98064] font-semibold text-md italic uppercase tracking-wider",
    collegeInfo: "text-gray-400 text-sm mt-2 leading-relaxed",
  };

  return (
    <header className={styles.header}>
      {/* Top: Icon & Institution */}
      <div className={styles.topSection}>
        {/* RoomCraft Icon */}
        <svg viewBox="0 0 24 24" className={styles.icon} fill="currentColor">
          <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm5 15h-2v-6H9v6H7v-7.81l5-4.5 5 4.5V18z" />
          <circle cx="12" cy="11" r="2" />
        </svg>
        <img
          src="sati_logo.png"
          alt="SATI Logo"
          className="h-14 md:h-16 object-contain brightness-0 invert opacity-90"
        />
      </div>

      {/* Main Title Area */}
      <div className={styles.titleSection}>
        <h1 className={styles.mainTitle} style={styles.mainTitleFontSize}>
          ROOMCRAFT
        </h1>
        <div className="h-1 w-24 bg-[#d98064] mx-auto mt-4"></div>
        <h2 className={styles.subTitle}>
          Compatible Roommate Matching Platform
        </h2>
      </div>

      {/* NEW: Project Info Bar (Matching the style of image_0d905b.png) */}
      <div className={styles.infoBar}>
        <span>TEAM ID: CS2025TID31</span>
        <span className="hidden md:block">|</span>
        <span>COORD: PROF. MUKESH AZAD</span>
      </div>

      {/* Team & Faculty Details */}
      <div className={styles.detailsSection}>
        <div className={styles.grid}>
          {/* Left: Project Members */}
          <div className="flex flex-col border-l-4 border-[#d98064] pl-6">
            <p className={styles.label}>Developed By:</p>
            <div className="space-y-2">
              {[
                { name: "YASH KUSHWAHA", id: "0108CS221158" },
                { name: "NISHANT CHOUDHARY", id: "0108CS221083" },
                { name: "PRINCE KOSHAL", id: "0108CS221093" },
                { name: "RAJEEV BAMNEY", id: "0108CS221100" },
              ].map((m) => (
                <div key={m.id} className="group">
                  <span className={styles.memberName}>{m.name}</span>
                  <span className={styles.memberId}>[{m.id}]</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Supervision */}
          <div className="flex flex-col md:items-end text-left md:text-right border-r-0 md:border-r-4 border-[#d98064] md:pr-6">
            <p className={styles.label}>Under the Supervision of:</p>
            <h3 className={styles.supervisorName}>Garima Jain Ma’am</h3>
            <p className={styles.supervisorTitle}>Assistant Professor</p>

            <div className="mt-4 pt-4 border-t border-gray-800">
              <p className={styles.label}>Project Coordinator:</p>
              <p className="text-white font-bold">Prof. Mukesh Azad</p>
            </div>

            <p className={styles.collegeInfo}>
              Computer Science & Engineering <br />
              S.A.T.I, Vidisha (M.P.)
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PosterHeader;
