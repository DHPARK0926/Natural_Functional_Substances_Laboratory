/*
 * Natural Functional Substances Laboratory - bundled image loader
 * 79 original PNG filenames resolve to optimized WebP stored in images.bundle.bin.
 * Upload this JS alongside images.bundle.bin in the SAME folder as index.html.
 */
(() => {
  'use strict';
  const manifest = {"2022학회.png":[0,597004],"2025연말1.png":[597004,644282],"2025연말2.png":[1241286,484306],"2025학회.png":[1725592,189570],"2025학회2.png":[1915162,332558],"2026워크숍 참가.png":[2247720,515514],"23년도대학원.png":[2763234,621058],"6가지assay.png":[3384292,393102],"AI플로우.png":[3777394,243952],"GC-MS활용1.png":[4021346,82644],"GC-MS활용2.png":[4103990,78642],"GC.png":[4182632,98572],"GC사진.png":[4281204,372120],"GC워크플로우.png":[4653324,257128],"JSH.png":[4910452,43668],"lab-logo.png":[4954120,117226],"lab.png":[5071346,14798],"lab1.png":[5086144,16586],"lab2.png":[5102730,16166],"lab3.png":[5118896,15622],"lab4.png":[5134518,16446],"lab5.png":[5150964,15050],"lab6.png":[5166014,16152],"lab7.png":[5182166,15240],"lab8.png":[5197406,9122],"LYM.png":[5206528,8852],"MS흐름.png":[5215380,151540],"NMR데이터.png":[5366920,78888],"NMR데이터2.png":[5445808,145292],"photo1.png":[5591100,419824],"photo2.png":[6010924,416082],"photo3.png":[6427006,214488],"photo4.png":[6641494,675724],"photo5.png":[7317218,455444],"plant-metabolite-workflow.png":[7772662,384388],"popup-banner.png":[8157050,163122],"popup-banner2.png":[8320172,19058],"research-analysis-data.png":[8339230,194688],"research-analysis.png":[8533918,184054],"research-bioactivity-data.png":[8717972,165042],"research-bioactivity.png":[8883014,221570],"research-introduce.png":[9104584,304128],"research-separation.png":[9408712,173202],"sogogi.png":[9581914,435938],"ssdinner.png":[10017852,383344],"SYY.png":[10401196,17464],"고은정수상.png":[10418660,175820],"교수님서계심.png":[10594480,104178],"교수님수상.png":[10698658,184704],"교수님찐수상.png":[10883362,50072],"교수님총장옆.png":[10933434,61552],"깻잎GC-MS활용.png":[10994986,245912],"나무대사체.png":[11240898,52422],"내부1.png":[11293320,339672],"내부2.png":[11632992,364628],"내부3.png":[11997620,345100],"내부4.png":[12342720,366862],"내부5.png":[12709582,565788],"내부6.png":[13275370,663624],"도킹도킹.png":[13938994,333694],"매스플로우.png":[14272688,178626],"박동현수상.png":[14451314,372072],"박동현수상2.png":[14823386,149946],"볼링.png":[14973332,516184],"생육시기별GC.png":[15489516,49586],"솥뚜껑.png":[15539102,358088],"솥뚜껑외부.png":[15897190,346116],"신형HPLC교육.png":[16243306,617348],"실험실소개.png":[16860654,332266],"애질런트교육.png":[17192920,664576],"연구목적.png":[17857496,206842],"연구목적2.png":[18064338,246420],"워크플로우.png":[18310758,132296],"이소플라본에스트로겐.png":[18443054,122934],"전세현수상.png":[18565988,361198],"전세현우수논문상수상.png":[18927186,314292],"전세현우수연구상수상.png":[19241478,754074],"천연물영어.png":[19995552,164564],"후드쪽.png":[20160116,525898]};

  async function loadPhotos() {
    const targets = [...document.querySelectorAll('img[data-bundled-src]')];
    if (!targets.length) return;
    try {
      const response = await fetch('images.bundle.bin');
      if (!response.ok) throw new Error('HTTP ' + response.status);
      const buffer = await response.arrayBuffer();
      const cache = new Map();
      for (const img of targets) {
        const filename = img.getAttribute('data-bundled-src');
        const part = manifest[filename];
        if (!part) {
          console.warn('Image not found in bundle:', filename);
          continue;
        }
        let objectUrl = cache.get(filename);
        if (!objectUrl) {
          const [offset, size] = part;
          const segment = new Uint8Array(buffer, offset, size);
          objectUrl = URL.createObjectURL(new Blob([segment], { type: 'image/webp' }));
          cache.set(filename, objectUrl);
        }
        img.src = objectUrl;
        img.removeAttribute('data-bundled-src');
      }
      window.addEventListener('pagehide', () => {
        for (const url of cache.values()) URL.revokeObjectURL(url);
      }, { once: true });
    } catch (error) {
      console.error('Image bundle could not be loaded:', error);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadPhotos, { once: true });
  } else {
    loadPhotos();
  }
})();
