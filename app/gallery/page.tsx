import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photo gallery showcasing moments from conferences, travels, and life.",
};

// Placeholder gallery items - replace with your actual images
const galleryItems = [
  { id: 1, title: "Conference Presentation", category: "Academic" },
  { id: 2, title: "Lab Work", category: "Research" },
  { id: 3, title: "Team Photo", category: "Academic" },
  { id: 4, title: "Nature Walk", category: "Travel" },
  { id: 5, title: "City View", category: "Travel" },
  { id: 6, title: "Workshop", category: "Academic" },
];

const categories = ["All", "Academic", "Research", "Travel"];

export default function GalleryPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-20 section-alt">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="section-title mb-4">Gallery</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A collection of moments from conferences, research activities, travels, and everyday life.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  category === "All"
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Items */}
          {galleryItems.length > 0 ? (
            <div className="gallery-grid">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="gallery-item bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center"
                >
                  <div className="text-center p-4">
                    <span className="text-4xl font-bold text-primary/30 block mb-2">
                      {item.title.charAt(0)}
                    </span>
                    <p className="text-sm text-muted-foreground">{item.title}</p>
                    <span className="text-xs text-primary">{item.category}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <svg className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Coming Soon
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Photos will be added soon. Check back later!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
