using FluentValidation;

namespace Find_H_er.Models.Validators
{
    public class CreateMeetingDtoValidator : AbstractValidator<CreateMeetingDto>
    {
        public CreateMeetingDtoValidator()
        {
            RuleFor(x => x.MeetingName)
                .NotEmpty()
                .MaximumLength(30);
            RuleFor(x => x.MeetingDate.Date)
                .NotNull()
                .GreaterThanOrEqualTo(DateTime.Now.Date);
            RuleFor(x => x.PairId)
                .NotNull();
        }
    }
}
