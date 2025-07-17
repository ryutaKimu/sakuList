<?

namespace App\Services;

use App\Models\Img;
use App\Models\Member;
use ErrorException;
use Illuminate\Support\Facades\DB;

class DashBoardService
{
  public function createMember($request)
  {
    DB::beginTransaction();

    try {
      $requests = $request->all();
      $member = Member::create($requests);
      $fileName = $request->file('image')->getClientOriginalName();
      $path = $request->file('image')->storeAs('members', $fileName,  'public');

      Img::create([
        'member_id' => $member->id,
        'img_path' => 'storage/' . $path
      ]);
      DB::commit();
    } catch (ErrorException $e) {
      DB::rollBack();
      throw $e;
    }
  }

  public function updateMember($id, $request)
  {
    DB::beginTransaction();

    try {
      $member = Member::findOrFail($id);
      $info = $request->all();
      $member->fill($info);
      $member->save();

      DB::commit();

      return $member;
    } catch (ErrorException $e) {
      DB::rollBack();
      throw $e;
    }
  }
}
