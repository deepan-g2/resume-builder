import { useState } from 'react'
import { Palette, Type, Layout, Sliders, ChevronDown, ChevronUp } from 'lucide-react'

export default function CustomizationEditor({ resumeData, setResumeData }) {
  const [activeTab, setActiveTab] = useState('typography')
  const [isExpanded, setIsExpanded] = useState(false)

  const updateCustomization = (field, value) => {
    setResumeData({
      ...resumeData,
      customization: {
        ...resumeData.customization,
        [field]: value
      }
    })
  }

  const tabs = [
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'spacing', label: 'Spacing', icon: Layout },
    { id: 'colors', label: 'Colors & Style', icon: Palette },
  ]

  // Font families with descriptions
  const fontFamilies = [
    { value: 'Helvetica', label: 'Helvetica', description: 'Modern, Clean, Professional' },
    { value: 'Times-Roman', label: 'Times New Roman', description: 'Classic, Formal, Traditional' },
    { value: 'Courier', label: 'Courier', description: 'Technical, Monospace, Unique' },
  ]

  // Preset configurations
  const presets = {
    compact: { fontSize: 9.5, lineSpacing: 1.1, paragraphSpacing: 8, pageMargin: 25 },
    balanced: { fontSize: 11, lineSpacing: 1.5, paragraphSpacing: 12, pageMargin: 40 },
    spacious: { fontSize: 11.5, lineSpacing: 1.8, paragraphSpacing: 18, pageMargin: 50 },
  }

  const applyPreset = (presetName) => {
    const preset = presets[presetName]
    setResumeData({
      ...resumeData,
      customization: {
        ...resumeData.customization,
        ...preset
      }
    })
  }

  return (
    <>
      {/* Collapsed State */}
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all px-4 py-2.5 flex items-center justify-between group rounded-xl"
        >
          <div className="flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">Customization Studio</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-white/80">Customize fonts, colors, spacing and layout</span>
            <ChevronDown className="w-4 h-4 text-white group-hover:translate-y-0.5 transition-transform" />
          </div>
        </button>
      ) : (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
          {/* Expanded Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Sliders className="w-6 h-6 text-white" />
                <h3 className="text-xl font-bold text-white">Customization Studio</h3>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors"
              >
                <span className="text-sm">Collapse</span>
                <ChevronUp className="w-5 h-5" />
              </button>
            </div>
          </div>

      {/* Quick Presets */}
      <div className="px-6 py-4 border-b border-blue-200">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-semibold text-gray-700">Quick Presets:</span>
          <button
            onClick={() => applyPreset('compact')}
            className="px-4 py-2 text-sm font-medium bg-white text-blue-600 rounded-lg hover:bg-blue-50 border border-blue-200 transition-all"
          >
            Compact
          </button>
          <button
            onClick={() => applyPreset('balanced')}
            className="px-4 py-2 text-sm font-medium bg-white text-blue-600 rounded-lg hover:bg-blue-50 border border-blue-200 transition-all"
          >
            Balanced
          </button>
          <button
            onClick={() => applyPreset('spacious')}
            className="px-4 py-2 text-sm font-medium bg-white text-blue-600 rounded-lg hover:bg-blue-50 border border-blue-200 transition-all"
          >
            Spacious
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-blue-200">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 font-medium text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-100/50 text-blue-700 border-b-2 border-blue-600'
                  : 'text-gray-700 hover:bg-blue-50/30 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {/* Typography Tab */}
        {activeTab === 'typography' && (
          <div className="space-y-6">
            {/* Font Family */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-5 border border-gray-200">
              <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center space-x-2">
                <Type className="w-4 h-4" />
                <span>Font Family</span>
              </label>
              <div className="space-y-3">
                {fontFamilies.map((font) => (
                  <label
                    key={font.value}
                    className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      (resumeData.customization?.fontFamily || 'Helvetica') === font.value
                        ? 'border-blue-600 bg-blue-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="fontFamily"
                      value={font.value}
                      checked={(resumeData.customization?.fontFamily || 'Helvetica') === font.value}
                      onChange={(e) => updateCustomization('fontFamily', e.target.value)}
                      className="w-5 h-5 text-blue-600 mr-4"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{font.label}</div>
                      <div className="text-sm text-gray-600">{font.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Font Size */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-5 border border-gray-200">
              <label className="block text-sm font-bold text-gray-800 mb-3">
                Font Size: <span className="text-blue-600">{resumeData.customization?.fontSize || 11}pt</span>
              </label>
              <input
                type="range"
                min="9"
                max="14"
                step="0.5"
                value={resumeData.customization?.fontSize || 11}
                onChange={(e) => updateCustomization('fontSize', parseFloat(e.target.value))}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, rgb(37 99 235) 0%, rgb(37 99 235) ${((resumeData.customization?.fontSize || 11) - 9) / 5 * 100}%, rgb(219 234 254) ${((resumeData.customization?.fontSize || 11) - 9) / 5 * 100}%, rgb(219 234 254) 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <span className="font-medium">9pt (Small)</span>
                <span className="font-medium">11pt (Default)</span>
                <span className="font-medium">14pt (Large)</span>
              </div>
            </div>

            {/* Body Text Weight */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-5 border border-gray-200">
              <label className="block text-sm font-bold text-gray-800 mb-3">Body Text Weight</label>
              <div className="grid grid-cols-2 gap-3">
                {['normal', 'bold'].map((weight) => (
                  <label
                    key={weight}
                    className={`flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      (resumeData.customization?.fontWeight || 'normal') === weight
                        ? 'border-blue-600 bg-blue-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="fontWeight"
                      value={weight}
                      checked={(resumeData.customization?.fontWeight || 'normal') === weight}
                      onChange={(e) => updateCustomization('fontWeight', e.target.value)}
                      className="sr-only"
                    />
                    <span className="font-semibold text-gray-900 capitalize">{weight}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Spacing Tab */}
        {activeTab === 'spacing' && (
          <div className="space-y-6">
            {/* Line Spacing */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-5 border border-gray-200">
              <label className="block text-sm font-bold text-gray-800 mb-3">
                Line Spacing: <span className="text-blue-600">{resumeData.customization?.lineSpacing || 1.5}</span>
              </label>
              <input
                type="range"
                min="1.0"
                max="2.0"
                step="0.1"
                value={resumeData.customization?.lineSpacing || 1.5}
                onChange={(e) => updateCustomization('lineSpacing', parseFloat(e.target.value))}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, rgb(37 99 235) 0%, rgb(37 99 235) ${((resumeData.customization?.lineSpacing || 1.5) - 1.0) / 1.0 * 100}%, rgb(219 234 254) ${((resumeData.customization?.lineSpacing || 1.5) - 1.0) / 1.0 * 100}%, rgb(219 234 254) 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <span className="font-medium">1.0 (Compact)</span>
                <span className="font-medium">1.5 (Default)</span>
                <span className="font-medium">2.0 (Spacious)</span>
              </div>
            </div>

            {/* Section Spacing */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-5 border border-gray-200">
              <label className="block text-sm font-bold text-gray-800 mb-3">
                Section Spacing: <span className="text-blue-600">{resumeData.customization?.paragraphSpacing || 12}px</span>
              </label>
              <input
                type="range"
                min="8"
                max="24"
                step="2"
                value={resumeData.customization?.paragraphSpacing || 12}
                onChange={(e) => updateCustomization('paragraphSpacing', parseFloat(e.target.value))}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, rgb(37 99 235) 0%, rgb(37 99 235) ${((resumeData.customization?.paragraphSpacing || 12) - 8) / 16 * 100}%, rgb(219 234 254) ${((resumeData.customization?.paragraphSpacing || 12) - 8) / 16 * 100}%, rgb(219 234 254) 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <span className="font-medium">8px (Tight)</span>
                <span className="font-medium">12px (Default)</span>
                <span className="font-medium">24px (Loose)</span>
              </div>
            </div>

            {/* Page Margins */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-5 border border-gray-200">
              <label className="block text-sm font-bold text-gray-800 mb-3">
                Page Margins: <span className="text-blue-600">{resumeData.customization?.pageMargin || 40}px</span>
              </label>
              <input
                type="range"
                min="20"
                max="60"
                step="5"
                value={resumeData.customization?.pageMargin || 40}
                onChange={(e) => updateCustomization('pageMargin', parseFloat(e.target.value))}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, rgb(37 99 235) 0%, rgb(37 99 235) ${((resumeData.customization?.pageMargin || 40) - 20) / 40 * 100}%, rgb(219 234 254) ${((resumeData.customization?.pageMargin || 40) - 20) / 40 * 100}%, rgb(219 234 254) 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <span className="font-medium">20px (More content)</span>
                <span className="font-medium">40px (Default)</span>
                <span className="font-medium">60px (More space)</span>
              </div>
            </div>
          </div>
        )}

        {/* Colors & Style Tab */}
        {activeTab === 'colors' && (
          <div className="space-y-6">
            {/* Accent Color */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-5 border border-gray-200">
              <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center space-x-2">
                <Palette className="w-4 h-4" />
                <span>Accent Color</span>
              </label>
              <div className="flex items-center space-x-4 mb-4">
                <input
                  type="color"
                  value={resumeData.customization?.accentColor || "#2563eb"}
                  onChange={(e) => updateCustomization('accentColor', e.target.value)}
                  className="w-20 h-20 rounded-lg border-2 border-gray-300 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="font-mono text-sm text-gray-700 bg-white px-3 py-2 rounded border border-gray-300">
                    {resumeData.customization?.accentColor || "#2563eb"}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Used for headings, links, and highlights</div>
                </div>
              </div>

              {/* Preset Colors */}
              <div>
                <div className="text-xs font-medium text-gray-700 mb-2">Quick Colors:</div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'Blue', color: '#2563eb' },
                    { name: 'Red', color: '#dc2626' },
                    { name: 'Green', color: '#059669' },
                    { name: 'Purple', color: '#7c3aed' },
                    { name: 'Orange', color: '#ea580c' },
                    { name: 'Teal', color: '#0d9488' },
                    { name: 'Pink', color: '#db2777' },
                    { name: 'Indigo', color: '#4f46e5' },
                  ].map(({ name, color }) => (
                    <button
                      key={color}
                      onClick={() => updateCustomization('accentColor', color)}
                      className={`w-12 h-12 rounded-lg border-2 hover:scale-110 transition-transform ${
                        (resumeData.customization?.accentColor || "#2563eb") === color
                          ? 'border-gray-900 ring-2 ring-offset-2 ring-gray-900'
                          : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                      title={name}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Page Border Toggle */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-5 border border-gray-200">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={resumeData.customization?.showPageBorder || false}
                  onChange={(e) => updateCustomization('showPageBorder', e.target.checked)}
                  className="w-6 h-6 text-blue-600 rounded focus:ring-blue-500"
                />
                <div className="flex-1">
                  <span className="text-sm font-bold text-gray-800 block">Show Page Border</span>
                  <span className="text-xs text-gray-600">Add a decorative border around your resume</span>
                </div>
              </label>
            </div>

            {/* Border Options (shown only if border is enabled) */}
            {resumeData.customization?.showPageBorder && (
              <div className="space-y-4 pl-4 border-l-4 border-blue-300">
                {/* Border Width */}
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-5 border border-gray-200">
                  <label className="block text-sm font-bold text-gray-800 mb-3">
                    Border Width: <span className="text-blue-600">{resumeData.customization?.borderWidth || 2}px</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    step="1"
                    value={resumeData.customization?.borderWidth || 2}
                    onChange={(e) => updateCustomization('borderWidth', parseFloat(e.target.value))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, rgb(37 99 235) 0%, rgb(37 99 235) ${((resumeData.customization?.borderWidth || 2) - 1) / 3 * 100}%, rgb(219 234 254) ${((resumeData.customization?.borderWidth || 2) - 1) / 3 * 100}%, rgb(219 234 254) 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-2">
                    <span className="font-medium">1px (Thin)</span>
                    <span className="font-medium">2px (Default)</span>
                    <span className="font-medium">4px (Thick)</span>
                  </div>
                </div>

                {/* Border Color */}
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-5 border border-gray-200">
                  <label className="block text-sm font-bold text-gray-800 mb-3">Border Color</label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="color"
                      value={resumeData.customization?.borderColor || "#e5e7eb"}
                      onChange={(e) => updateCustomization('borderColor', e.target.value)}
                      className="w-20 h-20 rounded-lg border-2 border-gray-300 cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="font-mono text-sm text-gray-700 bg-white px-3 py-2 rounded border border-gray-300">
                        {resumeData.customization?.borderColor || "#e5e7eb"}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Click to choose a custom color</div>
                    </div>
                  </div>

                  {/* Preset Colors */}
                  <div className="mt-4">
                    <div className="text-xs font-medium text-gray-700 mb-2">Quick Colors:</div>
                    <div className="flex space-x-2">
                      {[
                        { color: '#e5e7eb', label: 'Light Gray' },
                        { color: '#374151', label: 'Dark Gray' },
                        { color: '#2563eb', label: 'Blue' },
                        { color: '#059669', label: 'Green' },
                        { color: '#dc2626', label: 'Red' },
                        { color: '#7c3aed', label: 'Purple' },
                      ].map((preset) => (
                        <button
                          key={preset.color}
                          onClick={() => updateCustomization('borderColor', preset.color)}
                          className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:scale-110 transition-transform"
                          style={{ backgroundColor: preset.color }}
                          title={preset.label}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

          {/* Footer Tip */}
          <div className="px-6 py-3 bg-blue-50 border-t border-blue-200">
            <p className="text-xs text-gray-600 flex items-center space-x-2">
              <span className="text-blue-600 font-bold">💡 Tip:</span>
              <span>Changes are applied in real-time to your resume preview</span>
            </p>
          </div>
        </div>
      )}
    </>
  )
}
