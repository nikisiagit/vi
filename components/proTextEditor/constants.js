export const Alignment = {
  left: 'left',
  center: 'center',
  right: 'right',
  justify: 'justify'
}
export const ALIGN_PATTERN = new RegExp(`(${Alignment.left}|${Alignment.center}|${Alignment.right}|${Alignment.justify})`);

export default {
  Alignment,
  ALIGN_PATTERN
}
