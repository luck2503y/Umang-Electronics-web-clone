const fs = require('fs');
const path = require('path');

const targetDir = 'C:\\Users\\Acer\\.gemini\\antigravity-ide\\brain\\ddfc588a-a9ce-49fa-8f11-d5bec0be2ffb';

const filesToCopy = [
  // Originals
  { src: 'inspection_data/screenshots_orig/orig_home_desktop_fold.png', dest: 'orig_home_desktop_fold.png' },
  { src: 'inspection_data/screenshots_orig/orig_home_desktop_full.png', dest: 'orig_home_desktop_full.png' },
  { src: 'inspection_data/screenshots_orig/orig__products_desktop_fold.png', dest: 'orig_products_desktop_fold.png' },
  { src: 'inspection_data/screenshots_orig/orig__products_orionix_fold.png', dest: 'orig_orionix_desktop_fold.png' },
  { src: 'inspection_data/screenshots_orig/orig__docs_fold.png', dest: 'orig_docs_desktop_fold.png' },
  { src: 'inspection_data/screenshots_orig/orig_home_mobile_fold.png', dest: 'orig_home_mobile_fold.png' },
  { src: 'inspection_data/screenshots_orig/orig_home_tablet_fold.png', dest: 'orig_home_tablet_fold.png' },
  { src: 'inspection_data/screenshots_orig/after_get_in_touch_click.png', dest: 'orig_modal_contact.png' },

  // Replica
  { src: 'validation_results/screenshots_replica/replica_home_desktop_fold.png', dest: 'replica_home_desktop_fold.png' },
  { src: 'validation_results/screenshots_replica/replica_home_desktop_full.png', dest: 'replica_home_desktop_full.png' },
  { src: 'validation_results/screenshots_replica/replica_products_desktop_fold.png', dest: 'replica_products_desktop_fold.png' },
  { src: 'validation_results/screenshots_replica/replica_orionix_desktop_fold.png', dest: 'replica_orionix_desktop_fold.png' },
  { src: 'validation_results/screenshots_replica/replica_docs_desktop_fold.png', dest: 'replica_docs_desktop_fold.png' },
  { src: 'validation_results/screenshots_replica/replica_home_mobile_fold.png', dest: 'replica_home_mobile_fold.png' },
  { src: 'validation_results/screenshots_replica/replica_home_tablet_fold.png', dest: 'replica_home_tablet_fold.png' },
  { src: 'validation_results/screenshots_replica/replica_modal_contact_open.png', dest: 'replica_modal_contact.png' }
];

for (const f of filesToCopy) {
  const fullSrc = path.join(__dirname, f.src);
  const fullDest = path.join(targetDir, f.dest);
  if (fs.existsSync(fullSrc)) {
    fs.copyFileSync(fullSrc, fullDest);
    console.log(`Copied ${f.dest}`);
  } else {
    console.log(`Missing src: ${fullSrc}`);
  }
}
