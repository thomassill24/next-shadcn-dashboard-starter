import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function CampaignPerformance() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">TAB-UK-1</p>
          <p className="text-sm text-muted-foreground">
            Campaign ID: XXXXXX
          </p>
        </div>
        <div className="ml-auto font-medium">2.31x</div>
      </div>
      <div className="flex items-center">
        <div className="ml-0 space-y-1">
          <p className="text-sm font-medium leading-none">TAB-UK-2</p>
          <p className="text-sm text-muted-foreground">Campaign ID: XXXXXX</p>
        </div>
        <div className="ml-auto font-medium">1.82x</div>
      </div>
      <div className="flex items-center">
        <div className="ml-0 space-y-1">
          <p className="text-sm font-medium leading-none">TAB-UK-3</p>
          <p className="text-sm text-muted-foreground">
            Campaign ID: XXXXXX
          </p>
        </div>
        <div className="ml-auto font-medium">1.98x</div>
      </div>
      <div className="flex items-center">
        <div className="ml-0 space-y-1">
          <p className="text-sm font-medium leading-none">TAB-UK-4</p>
          <p className="text-sm text-muted-foreground">Campaign ID: XXXXXX</p>
        </div>
        <div className="ml-auto font-medium">2.64x</div>
      </div>
      <div className="flex items-center">
        <div className="ml-0 space-y-1">
          <p className="text-sm font-medium leading-none">TAB-UK-5</p>
          <p className="text-sm text-muted-foreground">Campaign ID: XXXXXX</p>
        </div>
        <div className="ml-auto font-medium">4.56x</div>
      </div>
    </div>
  );
}
