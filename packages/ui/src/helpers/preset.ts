export type PresetClassValue =
    | string
    | string[]
    | string[][]
    | undefined
    | null
    | false

export type PresetRecord = Record<string, any>

export type PresetCondition<State extends string> = [
    state: State,
    active: boolean
]

export function normalizePresetClasses(value: PresetClassValue): string[] {
    if (!value) {
        return []
    }

    if (typeof value === 'string') {
        return [value]
    }

    return value.flat().filter(Boolean)
}

export function getPresetOnly<State extends string>(
    preset: PresetRecord | undefined,
    zone: string,
    conditions: PresetCondition<State>[],
): string[] {
    const state = conditions.find(([, active]) => active)?.[0]

    if (!state) {
        return normalizePresetClasses(preset?.[zone] as PresetClassValue)
    }

    return normalizePresetClasses(preset?.[state]?.[zone] as PresetClassValue)
}

export function getPresetIf(
    condition: boolean,
    classes: PresetClassValue,
): string[] {
    return condition ? normalizePresetClasses(classes) : []
}
