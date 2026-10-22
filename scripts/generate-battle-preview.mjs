// Recria o GIF a partir de um cenário Canvas e dos sprites já usados no site.
// Ferramentas de autoria: Playwright/Chromium e ffmpeg. Não são dependências do site.
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import { readFile, writeFile, mkdir, mkdtemp, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const output = new URL('../public/images/editor/', import.meta.url);
const sprites = {};
for (const name of ['swampert', 'gengar']) sprites[name] = `data:image/png;base64,${(await readFile(new URL(`../public/images/pokemon/${name}.png`, import.meta.url))).toString('base64')}`;
const frames = await mkdtemp(join(tmpdir(), 'sab-battle-'));
const browser = await chromium.launch({
  ...(process.env.BATTLE_CHROMIUM_PATH ? { executablePath: process.env.BATTLE_CHROMIUM_PATH } : {}),
  headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
try {
  const page = await browser.newPage();
  await page.setContent('<canvas width="320" height="180"></canvas>');
  await page.evaluate(async sprites => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    const images = {};
    for (const [name, src] of Object.entries(sprites)) { const image = new Image(); image.src = src; await image.decode(); images[name] = image; }
    const rect = (x,y,w,h,color) => {ctx.fillStyle=color;ctx.fillRect(Math.round(x),Math.round(y),w,h);};
    const ellipse = (x,y,rx,ry,color) => {ctx.fillStyle=color;ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.fill();};
    const text = (label,x,y,color='#283f3b') => {ctx.fillStyle=color;ctx.font='bold 8px monospace';ctx.fillText(label,x,y);};
    const hud = (name,x,y,hp) => {rect(x,y,108,25,'#2f4947');rect(x+2,y+2,104,21,'#f0efcf');text(name,x+5,y+10);text('50',x+90,y+10);text('HP',x+5,y+20);rect(x+22,y+14,78,5,'#536458');rect(x+23,y+15,Math.round(76*hp),3,'#56aa65');};
    window.renderBattle = t => {
      rect(0,0,320,180,'#97cdd1');
      for(const [x,y] of [[25,17],[127,8],[269,19]]){rect(x,y,28,6,'#e2efdb');rect(x+7,y-4,18,5,'#e2efdb');}
      ctx.fillStyle='#6b9e9f';ctx.beginPath();ctx.moveTo(70,65);ctx.lineTo(135,15);ctx.lineTo(200,65);ctx.fill();
      for(let x=-10;x<340;x+=23){rect(x,50,14,32,'#467e69');rect(x+4,36,6,16,'#467e69');rect(x-5,58,24,14,'#467e69');rect(x+5,70,4,18,'#486753');}
      rect(0,81,320,62,'#96bd73');rect(0,83,320,4,'#79a764');
      for(let i=0;i<75;i++){const x=(i*47)%320,y=88+(i*19)%50;rect(x,y,2,2,i%3?'#77a163':'#c5d48b');}
      ellipse(244,79,54,11,'#6e9c62');ellipse(244,77,51,8,'#b9cd88');ellipse(75,130,67,12,'#6e9c62');ellipse(75,127,63,9,'#b9cd88');
      const water=t>=1.3&&t<2.2,shadow=t>=4.4&&t<5.3;
      const hitG=t>=2.2&&t<2.6,hitS=t>=5.3&&t<5.7;
      const bob=Math.round(Math.sin(t*5)*1.5);
      let gx=190+(hitG?Math.round(Math.sin(t*45)*3):0),sx=9+(water?Math.round(Math.sin((t-1.3)*Math.PI/.9)*8):0)+(hitS?Math.round(Math.sin(t*45)*3):0);
      ctx.drawImage(images.gengar,gx,4+bob,108,108);ctx.drawImage(images.swampert,sx,28-bob,128,128);
      if(water){const p=(t-1.3)/.9,x=100+p*128,y=91-p*36;for(let i=0;i<4;i++){rect(x-i*7,y+i*2,13-i*2,7,'#d6f8f5');rect(x-i*7,y+i*2+5,10-i,3,'#65cde7');}}
      if(shadow){const p=(t-4.4)/.9,x=233-p*132,y=60+p*38;rect(x-8,y-8,16,16,'#583a82');rect(x-5,y-11,10,22,'#583a82');rect(x-11,y-5,22,10,'#583a82');rect(x-5,y-5,10,10,'#a487cf');rect(x-2,y-3,4,5,'#d9bbef');}
      if(hitG||hitS){const x=hitG?244:79,y=hitG?59:100;rect(x-18,y-1,36,2,'#efe6b1');rect(x-1,y-18,2,36,'#efe6b1');}
      hud('GENGAR',8,9,t>=2.2?.64:1);hud('SWAMPERT',202,112,t>=5.3?.72:1);
      rect(0,145,320,35,'#283f3b');rect(3,148,314,29,'#f0efcf');rect(6,151,308,23,'#fff9e1');
      text(t<1.3?'SWAMPERT  vs  GENGAR':t<3.5?"SWAMPERT usou Jato d'água!":t<4.4?'GENGAR prepara seu ataque...':t<6.8?'GENGAR usou Bola Sombria!':'A batalha continua!',12,165);
      return canvas.toDataURL('image/png').split(',')[1];
    };
  }, sprites);
  for (let i=0;i<120;i++) {const png=await page.evaluate(t=>window.renderBattle(t),i/15);await writeFile(join(frames,`${String(i).padStart(3,'0')}.png`),Buffer.from(png,'base64'));}
  await mkdir(output,{recursive:true});
  execFileSync('ffmpeg',['-y','-loglevel','error','-framerate','15','-i',join(frames,'%03d.png'),'-filter_complex','[0:v]split[a][b];[a]palettegen=max_colors=128:stats_mode=diff[p];[b][p]paletteuse=dither=none','-loop','0',new URL('pokemon-battle.gif',output).pathname]);
  execFileSync('ffmpeg',['-y','-loglevel','error','-i',join(frames,'000.png'),'-frames:v','1',new URL('pokemon-battle-poster.webp',output).pathname]);
  const info = await stat(new URL('pokemon-battle.gif',output));
  if (info.size < 1000) throw new Error('Animated GIF export is empty');
  console.log(`Created 8-second pixel battle GIF (${info.size} bytes) and static poster.`);
} finally {await browser.close();await rm(frames,{recursive:true,force:true});}
