import { constants } from '@/constants'
import { voucherService } from '@/services/voucher'
import { handleNotification } from '@/utils'

import { create } from 'zustand'

const useVoucherStore = create((set, get) => ({
  vouchers: [],
  voucher: {},
  isLoading: false,

  createVoucher: async (data, onSuccess = () => {}) => {
    set({ isLoading: true })
    try {
      await voucherService.createVoucher(data)
      await get().getAllVoucher()
      onSuccess()
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  },
  getVoucherValid: async () => {
    set({ isLoading: true })
    try {
      const res = await voucherService.getVoucherValid()
      set({ vouchers: res.data })
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  },
  getAllVoucher: async () => {
    set({ isLoading: true })
    try {
      const res = await voucherService.getAllVoucher()
      set({ vouchers: res.data })
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  },
  getVoucherByCode: async (data) => {
    set({ isLoading: true })
    try {
      const res = await voucherService.getVoucherByCode(data)
      set({ voucher: res.data })
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, error)
    } finally {
      set({ isLoading: false })
    }
  }
}))

export default useVoucherStore
