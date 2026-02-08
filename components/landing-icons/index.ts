import { defineComponent, h } from 'vue'

const svg = (paths: ReturnType<typeof h>[], viewBox = '0 0 24 24') =>
  defineComponent({
    name: 'SvgIcon',
    props: { class: { type: String, default: 'w-5 h-5' } },
    setup (props) {
      return () =>
        h(
          'svg',
          {
            xmlns: 'http://www.w3.org/2000/svg',
            width: 24,
            height: 24,
            viewBox,
            fill: 'none',
            stroke: 'currentColor',
            'stroke-width': 2,
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            class: props.class,
          },
          paths,
        )
    },
  })

const path = (d: string) => h('path', { d })
const line = (x1: number, y1: number, x2: number, y2: number) =>
  h('line', { x1: String(x1), y1: String(y1), x2: String(x2), y2: String(y2) })
const circle = (cx: number, cy: number, r: number) =>
  h('circle', { cx: String(cx), cy: String(cy), r: String(r) })
const rect = (attrs: Record<string, string | number>) => h('rect', attrs)
const polyline = (points: string) => h('polyline', { points })

export const ArrowRightIcon = svg([path('M5 12h14'), path('m12 5 7 7-7 7')])
export const TargetIcon = svg([
  circle(12, 12, 10),
  circle(12, 12, 6),
  circle(12, 12, 2),
])
export const UsersIcon = svg([
  path('M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'),
  circle(9, 7, 4),
  path('M22 21v-2a4 4 0 0 0-3-3.87'),
  path('M16 3.13a4 4 0 0 1 0 7.75'),
])
export const CalendarIcon = svg([
  path('M8 2v4'),
  path('M16 2v4'),
  rect({ width: 18, height: 18, x: 3, y: 4, rx: 2 }),
  path('M3 10h18'),
])
export const BarChartIcon = svg([
  line(12, 20, 12, 10),
  line(18, 20, 18, 4),
  line(6, 20, 6, 16),
])
export const MessageSquareIcon = svg([
  path('M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'),
])
export const FileCheckIcon = svg([
  path('M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z'),
  path('M14 2v4a2 2 0 0 0 2 2h4'),
  path('m9 15 2 2 4-4'),
])
export const BellIcon = svg([
  path('M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9'),
  path('M10.3 21a1.94 1.94 0 0 0 3.4 0'),
])
export const CheckCircleIcon = svg([
  path('M22 11.08V12a10 10 0 1 1-5.93-9.14'),
  path('m9 11 3 3L22 4'),
])
export const UserPlusIcon = svg([
  path('M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'),
  circle(9, 7, 4),
  line(19, 8, 19, 14),
  line(22, 11, 16, 11),
])
export const RouteIcon = svg([
  circle(6, 19, 3),
  path('M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15'),
  circle(18, 5, 3),
])
export const TrophyIcon = svg([
  path('M6 9H4.5a2.5 2.5 0 0 1 0-5H6'),
  path('M18 9h1.5a2.5 2.5 0 0 0 0-5H18'),
  path('M4 22h16'),
  path('M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22'),
  path('M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22'),
  path('M18 2H6v7a6 6 0 0 0 12 0V2Z'),
])
export const MonitorIcon = svg([
  rect({ width: 20, height: 14, x: 2, y: 3, rx: 2 }),
  line(8, 21, 16, 21),
  line(12, 17, 12, 21),
])
export const SmartphoneIcon = svg([
  rect({ width: 14, height: 20, x: 5, y: 2, rx: 2, ry: 2 }),
  path('M12 18h.01'),
])
export const QuoteIcon = svg([
  path('M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2z'),
  path('M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2z'),
])
export const StarIcon = defineComponent({
  name: 'StarIcon',
  props: { class: { type: String, default: 'w-5 h-5' } },
  setup (props) {
    return () =>
      h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        width: 24,
        height: 24,
        viewBox: '0 0 24 24',
        fill: 'currentColor',
        class: props.class,
      }, [h('path', { d: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' })])
  },
})
export const GiftIcon = svg([
  polyline('20 12 20 22 4 22 4 12'),
  rect({ width: 20, height: 5, x: 2, y: 7 }),
  line(12, 22, 12, 7),
  path('M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z'),
  path('M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z'),
])
export const ClockIcon = svg([
  circle(12, 12, 10),
  polyline('12 6 12 12 16 14'),
])
export const MailIcon = svg([
  rect({ width: 20, height: 16, x: 2, y: 4, rx: 2 }),
  path('m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7'),
])
export const InstagramIcon = svg([
  rect({ width: 20, height: 20, x: 2, y: 2, rx: 5, ry: 5 }),
  path('M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z'),
  line(17.5, 6.5, 17.51, 6.5),
])
export const TwitterIcon = svg([
  path('M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z'),
])
export const FacebookIcon = svg([
  path('M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'),
])
