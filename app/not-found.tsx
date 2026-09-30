import { withBase } from '../lib/base-path';
export default function NotFound() {
  return (
    <main className="not-found">
      {/* MAHER character looking puzzled; decorative. */}
      {/* oxlint-disable-next-line next/no-img-element */}
      <img className="not-found__art not-found__character" src={withBase('/media/character/maher-curious.webp')} alt="" width={395} height={420} decoding="async" />
      <span>404</span>
      <h1>There is no learning path here.</h1>
      <p>هذه الصفحة غير موجودة. يمكنك العودة إلى موقع ماهر.</p>
      <div><a href={withBase('/en')}>English home</a><a href={withBase('/ar')}>الرئيسية العربية</a></div>
    </main>
  );
}
