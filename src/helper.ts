import { ColumnProps } from './store/store'
export const generateFitUrl = (column: ColumnProps, width: number, height: number) => {
  if (column.avatar) {
    column.avatar.fitUrl = column.avatar.url + `?x-oss-process=image/resize,m_pad,h_${height},w_${width}`
  } else {
    column.avatar = {
      fitUrl: require('@/assets/column.png')
    }
  }
}
