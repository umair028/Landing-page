import type { LogoSpec, MarkKind } from '@/components/art/LogoArt'
import type { SitePalette } from '@/components/art/Mockups'
import type { AvatarSpec } from '@/components/art/Avatar'

type LogoRow = [
  name: string,
  tagline: string,
  mark: MarkKind,
  bg: string,
  fg: string,
  accent: string,
  layout?: LogoSpec['layout'],
]

/** Compact table of the drawn sample logos. Indexes are referenced throughout the site, so append rather than reorder. */
const logoRows: LogoRow[] = [
  ['Harborline', 'Seafood kitchen', 'wave', '#0f2747', '#ffffff', '#3cc6ff'],
  ['Kettle & Crumb', 'Bakehouse', 'sunrise', '#f6e7cf', '#3a1f0f', '#e2733a', 'badge'],
  ['Northpeak', 'Outdoor supply', 'peaks', '#1d3b2a', '#f3f0e6', '#7fd1a0'],
  ['Voltage', 'EV charging', 'bolt', '#111114', '#ffffff', '#f5e52b', 'inline'],
  ['Lumen Dental', 'Family care', 'drop', '#e8f5ff', '#0b3a5c', '#2aa7ff'],
  ['Crownroast', 'Coffee roasters', 'crown', '#2a1a12', '#f7e5c4', '#d99a3e', 'badge'],
  ['Fernwood', 'Botanicals', 'leaf', '#eef5e8', '#1f4022', '#58a55c'],
  ['Orbital', 'Analytics', 'orbit', '#0d0b1f', '#ffffff', '#7b5cff', 'inline'],
  ['Stackhouse', 'Builders', 'stack', '#ffcf3f', '#141414', '#ff6b2b'],
  ['Prism Labs', 'Product studio', 'diamond', '#1a1035', '#ffffff', '#ff4fa3'],
  ['Brightside', 'Solar co.', 'spark', '#fff4d6', '#3b2400', '#ff9f1a'],
  ['Ironclad', 'Security', 'shield', '#14181f', '#e7ecf3', '#4f7cff', 'badge'],
  ['Hive Coworking', 'Shared office', 'hex', '#ffe25a', '#1b1b1b', '#1b1b1b'],
  ['Maple & Main', 'Real estate', 'monogram', '#5b1d1d', '#fbeee2', '#c2453b'],
  ['Tidewater', 'Kayak tours', 'wave', '#e4f6f4', '#0c4a46', '#24b3a5', 'inline'],
  ['Summit Fit', 'Training club', 'peaks', '#ff4a3d', '#ffffff', '#1a1a1a'],
  ['Glow Atelier', 'Skin studio', 'spark', '#f8e6ea', '#5a1f33', '#e86a92'],
  ['Copperleaf', 'Tea house', 'leaf', '#173430', '#f2d9b0', '#c8873f', 'badge'],
  ['Quanta', 'Fintech', 'orbit', '#ffffff', '#101828', '#04d66d', 'inline'],
  ['Royal Paws', 'Pet grooming', 'crown', '#6a3df2', '#ffffff', '#f5e52b'],
  ['Pure Spring', 'Water co.', 'drop', '#0d5c63', '#ffffff', '#7fe3e8'],
  ['Atlas Freight', 'Logistics', 'stack', '#0e1726', '#f5f7fa', '#ff7a1a', 'inline'],
  ['Gemstone', 'Jewelry', 'diamond', '#f4efe9', '#2c2219', '#b48a5a'],
  ['Bolt Couriers', 'Same-day delivery', 'bolt', '#04d66d', '#0b1f14', '#0b1f14'],
  ['Sentinel', 'Cyber defense', 'shield', '#0a0a0a', '#ffffff', '#04d66d', 'inline'],
  ['Honeycomb', 'Kids academy', 'hex', '#fff1c9', '#40210a', '#ffb000', 'badge'],
  ['Dawnbreak', 'Wellness retreat', 'sunrise', '#2b1748', '#ffe9c7', '#ff8a5b'],
  ['Mason Legal', 'Attorneys', 'monogram', '#f3f1ec', '#1c2430', '#b0915a'],
  ['Wavelength', 'Podcast network', 'wave', '#ff3d6e', '#ffffff', '#2b0b16'],
  ['Evergreen', 'Landscaping', 'peaks', '#e9f4e4', '#123d1d', '#3c9d4e', 'badge'],
]

export const logos: LogoSpec[] = logoRows.map(([name, tagline, mark, bg, fg, accent, layout]) => ({
  name,
  tagline,
  mark,
  bg,
  fg,
  accent,
  layout,
}))

export const sites: Array<{ title: string; p: SitePalette; backdrop: string }> = [
  {
    title: 'Harborline',
    p: { bg: '#f6f8fb', surface: '#ffffff', ink: '#0f2747', accent: '#3cc6ff', hero: '#0f2747' },
    backdrop: '#c8232c',
  },
  {
    title: 'Crownroast',
    p: { bg: '#1c120c', surface: '#2a1a12', ink: '#f7e5c4', accent: '#d99a3e', hero: '#3a2418' },
    backdrop: '#ffcf3f',
  },
  {
    title: 'Northpeak',
    p: { bg: '#f3f0e6', surface: '#ffffff', ink: '#1d3b2a', accent: '#58a55c', hero: '#1d3b2a' },
    backdrop: '#6a3df2',
  },
  {
    title: 'Orbital',
    p: { bg: '#0d0b1f', surface: '#1a1733', ink: '#ffffff', accent: '#7b5cff', hero: '#231d4f' },
    backdrop: '#04d66d',
  },
  {
    title: 'Glow Atelier',
    p: { bg: '#fff7f9', surface: '#ffffff', ink: '#5a1f33', accent: '#e86a92', hero: '#f8e6ea' },
    backdrop: '#0b1f14',
  },
  {
    title: 'Atlas Freight',
    p: { bg: '#f5f7fa', surface: '#ffffff', ink: '#0e1726', accent: '#ff7a1a', hero: '#0e1726' },
    backdrop: '#3cc6ff',
  },
  {
    title: 'Fernwood',
    p: { bg: '#eef5e8', surface: '#ffffff', ink: '#1f4022', accent: '#58a55c', hero: '#c9e3bf' },
    backdrop: '#ff6b2b',
  },
  {
    title: 'Quanta',
    p: { bg: '#ffffff', surface: '#f2f4f7', ink: '#101828', accent: '#04d66d', hero: '#101828' },
    backdrop: '#f5e52b',
  },
  {
    title: 'Lumen Dental',
    p: { bg: '#f4fbff', surface: '#ffffff', ink: '#0b3a5c', accent: '#2aa7ff', hero: '#d7efff' },
    backdrop: '#1a1035',
  },
  {
    title: 'Summit Fit',
    p: { bg: '#141414', surface: '#1f1f1f', ink: '#ffffff', accent: '#ff4a3d', hero: '#2a2a2a' },
    backdrop: '#e8f5ff',
  },
  {
    title: 'Kettle & Crumb',
    p: { bg: '#fffaf2', surface: '#ffffff', ink: '#3a1f0f', accent: '#e2733a', hero: '#f6e7cf' },
    backdrop: '#0d5c63',
  },
  {
    title: 'Mason Legal',
    p: { bg: '#f3f1ec', surface: '#ffffff', ink: '#1c2430', accent: '#b0915a', hero: '#1c2430' },
    backdrop: '#5b1d1d',
  },
]

export const people: AvatarSpec[] = [
  {
    name: 'Theo Marsh',
    skin: '#f1c7a5',
    hair: '#3b2a20',
    shirt: '#0b1f14',
    bg: '#ffd84d',
    style: 0,
    photo: '/people/theo-marsh.webp',
  },
  {
    name: 'Ines Rocha',
    skin: '#d9a07b',
    hair: '#2a1a14',
    shirt: '#6a3df2',
    bg: '#ffe7f0',
    style: 1,
    photo: '/people/ines-rocha.webp',
  },
  {
    name: 'Ken Ito',
    skin: '#f0cfa8',
    hair: '#121212',
    shirt: '#04d66d',
    bg: '#dff3ff',
    style: 2,
    photo: '/people/ken-ito.webp',
  },
  {
    name: 'Zola Adeyemi',
    skin: '#8d5a3b',
    hair: '#1a0f0a',
    shirt: '#ff6b2b',
    bg: '#e9ffe9',
    style: 3,
    photo: '/people/zola-adeyemi.webp',
  },
  {
    name: 'Priya Nair',
    skin: '#c88d64',
    hair: '#1c1210',
    shirt: '#0f2747',
    bg: '#fff3c4',
    style: 1,
    photo: '/people/priya-nair.webp',
  },
  {
    name: 'Owen Hale',
    skin: '#f3d2b8',
    hair: '#a5642d',
    shirt: '#e86a92',
    bg: '#e5e0ff',
    style: 0,
    photo: '/people/owen-hale.webp',
  },
  {
    name: 'Mateo Cruz',
    skin: '#d8a681',
    hair: '#2b1d14',
    shirt: '#1a1a1a',
    bg: '#ffe0cc',
    style: 2,
    photo: '/people/mateo-cruz.webp',
  },
  {
    name: 'Hana Becker',
    skin: '#f5d6bf',
    hair: '#d4a85a',
    shirt: '#24b3a5',
    bg: '#f0f0f0',
    style: 1,
    photo: '/people/hana-becker.webp',
  },
  {
    name: 'Elena Hart',
    skin: '#f3d9c4',
    hair: '#c9c9c9',
    shirt: '#ffffff',
    bg: '#cfe3ee',
    style: 2,
    photo: '/people/elena-hart.webp',
  },
]
