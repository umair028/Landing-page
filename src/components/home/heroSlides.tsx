import type { ReactNode } from 'react'
import { logos, sites } from '@/data/art'
import { AnimatedMark, LogoArt } from '@/components/art/LogoArt'
import { BrowserMockup, LaptopMockup } from '@/components/art/Mockups'
import { CanvaCover, CanvaLogo, CanvaVideo } from '@/components/art/CanvaArt'
import { canva, siteShots } from '@/data/canva'

/* Slide builders for the rotating hero cards. Kept at module scope so the arrays are stable. */

const logo = (i: number) => <LogoArt key={`l${i}`} spec={logos[i]} className="h-full w-full" />
const laptop = (i: number, backdrop: string) => (
  <LaptopMockup key={`p${i}`} p={sites[i].p} title={sites[i].title} backdrop={backdrop} variant={i} />
)
const monitor = (i: number, bg: string) => (
  <div key={`m${i}`} className="h-full w-full p-[8%] pb-[16%]" style={{ background: bg }}>
    <div className="h-full w-full overflow-hidden rounded-md shadow-lg">
      <BrowserMockup p={sites[i].p} title={sites[i].title} variant={i} />
    </div>
  </div>
)
const motion = (
  variant: 'ring' | 'bars' | 'orbit' | 'squares',
  bg: string,
  accent: string,
  fg: string,
  name: string,
) => (
  <AnimatedMark
    key={`a${name}`}
    variant={variant}
    bg={bg}
    accent={accent}
    fg={fg}
    name={name}
    className="h-full w-full"
  />
)

/** Left-top card: logo marks. Canva client logos lead and drawn marks fill out the rotation. */
export const logoSlides: ReactNode[] = [
  <CanvaLogo key="c-crown" img={canva.crownroast} bg={canva.crownroast.bg} pad="0" />,
  logo(5),
  <CanvaLogo key="c-harbor" img={canva.harborline} bg={canva.harborline.bg} pad="0" />,
  logo(0),
  <CanvaLogo key="c-volt" img={canva.voltage} bg={canva.voltage.bg} pad="0" />,
  logo(9),
  <CanvaLogo key="c-north" img={canva.northpeak} bg={canva.northpeak.bg} pad="0" />,
  ...[3, 13, 19, 7, 26, 11, 22, 15, 29].map(logo),
]

/** Left-middle card: logos alternating with laptop mockups. */
export const logoWebSlides: ReactNode[] = [
  laptop(1, '#ffcf3f'),
  <CanvaLogo key="c-glow" img={canva.glowAtelier} bg={canva.glowAtelier.bg} pad="0" />,
  laptop(4, '#0b1f14'),
  logo(17),
  laptop(9, '#e8f5ff'),
  logo(23),
]

/** Left-bottom card: brand campaigns and banners made in Canva. */
export const brandSlides: ReactNode[] = [
  <CanvaCover key="c-smile" img={canva.smileBright} />,
  <CanvaLogo key="c-glowweek" img={canva.glowWeek} bg={canva.glowWeek.bg} pad="6%" />,
  <CanvaCover key="c-fresh" img={canva.freshDaily} />,
  <CanvaCover key="c-nodays" img={canva.noDaysOff} />,
  <CanvaLogo key="c-autumn" img={canva.autumnReserve} bg={canva.autumnReserve.bg} pad="6%" />,
  <CanvaCover key="c-grow" img={canva.growGood} />,
]

/** Right-bottom card: animated logos. */
export const motionSlides: ReactNode[] = [
  <CanvaVideo key="c-skull" video={canva.skull} />,
  motion('ring', '#e9e7ff', '#6a3df2', '#1a1035', 'Orbital'),
  motion('bars', '#0a0a0a', '#04d66d', '#ffffff', 'Wavelength'),
  motion('squares', '#ffcf3f', '#141414', '#ff6b2b', 'Stackhouse'),
  motion('orbit', '#0f2747', '#3cc6ff', '#ffffff', 'Quanta'),
]

/** Right-top card: websites alternating with motion. */
export const webMotionSlides: ReactNode[] = [
  logo(18),
  monitor(7, '#f5e52b'),
  motion('orbit', '#111114', '#f5e52b', '#ffffff', 'Voltage'),
  monitor(10, '#a6f0e4'),
  motion('bars', '#ff3d6e', '#ffffff', '#2b0b16', 'Pulse'),
  monitor(0, '#dfe8ff'),
]

/** Right-middle card: website screens. */
export const webSlides: ReactNode[] = [
  monitor(6, '#3b6cf6'),
  monitor(3, '#04d66d'),
  monitor(8, '#6a3df2'),
  monitor(11, '#ff6b2b'),
  monitor(2, '#0b1f14'),
  monitor(5, '#f5e52b'),
]

/** Preloaded up front so each slide is already loaded when its crossfade starts. */
export const heroImages = [
  ...Object.values(siteShots),
  canva.smileBright.src,
  canva.freshDaily.src,
  canva.noDaysOff.src,
  canva.growGood.src,
]

/** Card channels. The conductor advances one of these at a time. */
export const heroChannels = ['hero-logos', 'hero-logoWeb', 'hero-brand', 'hero-motion', 'hero-webMotion', 'hero-web']
