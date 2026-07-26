import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const UserTypeSelector = ({ userType, setUserType, onClickHandler }: UserTypeSelectorParams) => {
  const accessChangeHandler = (type: UserType) => {
    setUserType(type);
    onClickHandler && onClickHandler(type);
  }

  return (
    <Select value={userType} onValueChange={(type: UserType) => accessChangeHandler(type)}>
      <SelectTrigger className="shad-select border border-pink-200 bg-white text-slate-700 rounded-lg shadow-sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="border border-pink-100 bg-white rounded-lg shadow-md">
        <SelectItem value="viewer" className="shad-select-item">can view</SelectItem>
        <SelectItem value="editor" className="shad-select-item">can edit</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default UserTypeSelector