import { create } from 'zustand'
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware'
import { Performance } from './type'

interface PopupState {
	isOpen: boolean
	message: string
	title: string
	// 팝업 상태 관리를 위한 액션들
	openPopup: (title: string, message: string) => void
	closePopup: () => void
}

export const usePopupStore = create<PopupState>((set) => ({
	isOpen: false,
	message: '',
	title: '',

	openPopup: (title: string, message: string) => {
		set({
			isOpen: true,
			title,
			message,
		})
	},

	closePopup: () => {
		set({
			isOpen: false,
			title: '',
			message: '',
		})
	},
}))

interface PerformanceState {
	performances: Performance[]
	setPerformances: (performances: Performance[]) => void
}

export const usePerformanceStore = create<PerformanceState>()(
	persist(
		(set) => ({
			performances: [],

			setPerformances: (performances) => set({ performances }),
		}),
		{
			name: 'performances',
		}
	)
)
