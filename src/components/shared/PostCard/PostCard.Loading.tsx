
const PostCardLoading = () => {
  return (
    <div className={'post-card animate-pulse'}>
      <div className={'flex-between'}>
        <div className={'flex items-center gap-3'}>
          <div className={'rounded-full bg-slate-800 h-14 w-14'}></div>
          <div className={'flex flex-col'}>
            <div className={'base-medium lg:body-bold relative'}>
              <span className={'invisible'}>Creator</span>
              <div className={'bg-slate-800 rounded absolute-center-y h-1/3 w-24'}></div>
            </div>
            <div className={'mt-2 space-y-3'}>
              <div className={'grid grid-cols-4 gap-3 w-48'}>
                <div className={'h-2 bg-slate-800 rounded col-span-3'}></div>
                <div className={'h-2 bg-slate-800 rounded col-span-1'}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={'small-medium lg:base-medium py-5'}>
        <div className={'space-y-3'}>
          <div className={'grid grid-cols-3 gap-4'}>
            <div className={'h-2 bg-slate-800 rounded col-span-2'}></div>
            <div className={'h-2 bg-slate-800 rounded col-span-1'}></div>
          </div>
          <div className={'h-2 bg-slate-800 rounded'}></div>
        </div>
      </div>
      <div className={'post-card_img-notfound rounded bg-slate-800'}></div>
    </div>
  )
}

export default PostCardLoading