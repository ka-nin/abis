import abisLogo from '../assets/abis_logo.png'

export default function BrandLockup() {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 shadow-md shadow-blue-500/30">
        <img src={abisLogo} alt="ABIS logo" className="h-6 w-6 object-contain brightness-0 invert" />
      </span>
      <div className="text-left">
        <p className="text-base font-bold leading-tight text-slate-900">ABIS</p>
        <p className="text-xs leading-tight text-slate-400">Voter Registration Portal</p>
      </div>
    </div>
  )
}